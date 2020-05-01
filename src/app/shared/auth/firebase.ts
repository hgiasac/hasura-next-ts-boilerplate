import { FetchPolicy, gql, ApolloClient } from "@apollo/client";
import Maybe from "graphql/tsutils/Maybe";
import { FirebaseApp } from "../vendor/firebase";
import { AuthProvider, UserNotFound } from "./types";

export type LoginInput = {
  readonly email: string
  readonly password: string
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

export default function ({ apolloClient }: AuthContext = {}): AuthProvider<AuthUser, LoginInput> {

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
    isAuthenticated: () => FirebaseApp().auth().currentUser !== null
  };
}