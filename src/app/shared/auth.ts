import { AnyObject } from "./types";
import { Config } from "./config";

export type LoginInput = {
  readonly email: string
  readonly password: string
};

export type AuthUser = {
  readonly id: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
};

export type AuthProvider<U extends AnyObject> = {
  readonly login: (input: LoginInput) => Promise<U>
  readonly logout: () => Promise<void>
  readonly getIdToken: () => Promise<string | null>
  readonly isAuthenticated: () => Promise<boolean>
};

export const authProvider: AuthProvider<AuthUser> = {
  login: ({ email }) => {
    localStorage.setItem(Config.authSessionKey, email);

    return Promise.resolve({
      id: "1",
      email,
      firstName: "Test",
      lastName: "User"
    });
  },
  logout: () => {
    localStorage.removeItem(Config.authSessionKey);

    return Promise.resolve();
  },
  getIdToken: () => Promise.resolve(
    localStorage.getItem(Config.authSessionKey)
  ),
  isAuthenticated: () => Promise.resolve(
    !!localStorage.getItem(Config.authSessionKey)
  )
};
