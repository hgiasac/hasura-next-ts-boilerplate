/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import { AnyObject, Maybe } from "../types";

export type LoginFunction<U, L> = (input: L) => Promise<U>;
export type LogoutFunction = () => Promise<void>;
export type GetUser<U> = (forceRefresh?: boolean) => Promise<Maybe<U>>;
export type GetIdToken = (forceRefresh?: boolean) => Promise<string | null>;
export type IsAuthenticated = () => boolean;
export type SendPasswordResetEmail = (email: string) => Promise<void>;
export type VerifyPasswordResetCode = (code: string) => Promise<string>;
export type ConfirmPasswordReset = (code: string, newPassword: string) => Promise<void>;
export type RegisterUser<U, R> = (input: R) => Promise<U>;

export type AuthProvider<U extends AnyObject, L extends AnyObject, R extends AnyObject> = {
  readonly login: LoginFunction<U, L>
  readonly logout: LogoutFunction
  readonly register: RegisterUser<U, R>
  readonly getUser: GetUser<U>
  readonly getIdToken: GetIdToken
  readonly isAuthenticated: IsAuthenticated
  readonly sendPasswordResetEmail: SendPasswordResetEmail
  readonly verifyPasswordResetCode: VerifyPasswordResetCode
  readonly confirmPasswordReset: ConfirmPasswordReset
};

export class UserNotFound extends Error {
  constructor(message: string) {
    super(message);

    this.name = "UserNotFound";
  }
}
