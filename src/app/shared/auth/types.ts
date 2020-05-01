/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Maybe from "graphql/tsutils/Maybe";
import { AnyObject } from "../types";

export type LoginFunction<U, L> = (input: L) => Promise<U>;
export type LogoutFunction = () => Promise<void>;
export type GetUser<U> = (forceRefresh?: boolean) => Promise<Maybe<U>>;
export type GetIdToken = (forceRefresh?: boolean) => Promise<string | null>;
export type IsAuthenticated = () => boolean;

export type AuthProvider<U extends AnyObject, L extends AnyObject> = {
  readonly login: LoginFunction<U, L>
  readonly logout: LogoutFunction
  readonly getUser: GetUser<U>
  readonly getIdToken: GetIdToken
  readonly isAuthenticated: IsAuthenticated
};

export class UserNotFound extends Error {
  constructor(message: string) {
    super(message);

    this.name = "UserNotFound";
  }
}
