import { AnyObject } from "./types";
import { Config } from "./config";

export type LoginInput = {
  readonly email: string
  readonly password: string
};

export type AuthUser = {
  readonly email: string
};

export type AuthProvider<U extends AnyObject> = {
  readonly login: (input: LoginInput) => Promise<U>
  readonly logout: () => Promise<void>
  readonly getUser: () => Promise<U | null>
  readonly getIdToken: () => Promise<string | null>
  readonly isAuthenticated: () => Promise<boolean>
};

export const authProvider: AuthProvider<AuthUser> = {
  login: ({ email }) => {
    localStorage.setItem(Config.authSessionKey, email);

    return Promise.resolve({
      email
    });
  },
  logout: () => {
    localStorage.removeItem(Config.authSessionKey);

    return Promise.resolve();
  },
  getUser: () => {
    const token = localStorage.getItem(Config.authSessionKey);

    return Promise.resolve(token ? {
      email: token
    } : null);
  },
  getIdToken: () => Promise.resolve(
    localStorage.getItem(Config.authSessionKey)
  ),
  isAuthenticated: () => Promise.resolve(
    !!localStorage.getItem(Config.authSessionKey)
  )
};
