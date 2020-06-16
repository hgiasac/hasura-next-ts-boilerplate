import { FetchPolicy, gql, ApolloClient } from "@apollo/client";
import { FirebaseApp } from "../vendor/firebase";
import { AuthProvider, UserNotFound } from "./types";
import { Maybe } from "../types";

export type LoginInput = {
  readonly email: string
  readonly password: string
};

export type CreateFirebaseUserInput = LoginInput;

export type RegisterUserInput = LoginInput & {
  readonly firstName: string
  readonly lastName: string
};

export type CreateProfileInput = {
  readonly email: string
  readonly firstName: string
  readonly lastName: string
};

export type AuthUser = {
  readonly id: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly role: string
  readonly createdAt: string
  readonly updatedAt: string
};

export type AuthContext = {
  readonly apolloClient?: ApolloClient<any>
};

export type LoginError = firebase.auth.Error | UserNotFound;

async function getProfile(apolloClient: ApolloClient<any>, fetchPolicy: FetchPolicy): Promise<Maybe<AuthUser>> {

  const query = gql`
    query getProfile {
      me {
        id
        email
        firstName
        lastName
        role
      }
    }
  `;

  const results = await apolloClient.query({
    query,
    fetchPolicy
  }).then(({ data }) => data.me as readonly AuthUser[]);

  return results.length ? results[0] : null;
}

async function createFirebaseUser(input: CreateFirebaseUserInput): Promise<firebase.User> {

  const cred = await FirebaseApp().auth()
    .createUserWithEmailAndPassword(input.email, input.password)
    .then(() => FirebaseApp().auth()
      .signInWithEmailAndPassword(input.email, input.password))
    .catch((err: firebase.auth.Error) => {
      // fallback if firebase user exists but not in our backend
      switch (err.code) {
        case "auth/email-already-in-use":
          return FirebaseApp().auth()
            .signInWithEmailAndPassword(input.email, input.password)
            .catch(() => Promise.reject(err));
        default:
          throw err;
      }
    });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return cred.user as firebase.User;
}

export async function createProfile(apolloClient: ApolloClient<any>, input: CreateProfileInput): Promise<AuthUser> {

  const mutation = gql`
    mutation createProfile($objects: [me_insert_input!]!) {
      insert_me(objects: $objects) {
        returning {
          id
          email
          firstName
          lastName
          role
        }
      }
    }
  `;

  const results = await apolloClient.mutate({
    mutation,
    variables: {
      objects: [input]
    }
  }).then(({ data }) => data.insert_me.returning as readonly AuthUser[]);

  return results[0];

}

export default function ({ apolloClient }: AuthContext = {}): AuthProvider<AuthUser, LoginInput, RegisterUserInput> {

  const getUser: (forceRefresh?: boolean) => Promise<Maybe<AuthUser>> = (forceRefresh) => {

    const client = assertApolloClient("login");

    return !FirebaseApp().auth().currentUser
      ? Promise.resolve(null)
      : getProfile(client, forceRefresh ? "network-only" : "cache-first");
  };

  const assertApolloClient = (actionName: string): ApolloClient<any> => {
    if (!apolloClient) {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(`${actionName} require apolloClient`);
    }

    return apolloClient;
  };

  return {
    login: async ({ email, password }) => {
      const client = assertApolloClient("login");

      const user = await FirebaseApp().auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => getProfile(client, "network-only"));

      if (!user) {
        throw new UserNotFound("user not found");
      }

      // clear apollo cache
      return client.resetStore().then(() => user);
    },
    logout: () => {

      const client = assertApolloClient("logout");

      return client.resetStore()
        .then(() => FirebaseApp().auth().signOut());

    },
    getUser,
    getIdToken: (forceRefresh) => {
      const user = FirebaseApp().auth().currentUser;

      return user === null
        ? Promise.resolve(null)
        : user.getIdToken(forceRefresh);
    },
    isAuthenticated: () => FirebaseApp().auth().currentUser !== null,
    sendPasswordResetEmail: (email) => FirebaseApp().auth()
      .sendPasswordResetEmail(email),
    verifyPasswordResetCode: (code) => FirebaseApp().auth()
      .verifyPasswordResetCode(code),
    confirmPasswordReset: (code, newPassword) => FirebaseApp().auth()
      .confirmPasswordReset(code, newPassword),
    register: async (input) => {
      const client = assertApolloClient("register");
      await createFirebaseUser(input);

      return createProfile(client, {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName
      });
    }
  };
}
