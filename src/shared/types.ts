import { Store } from "redux";
import { I18nState } from "./vendor/i18n";

export const AuthorizationHeader = "Authorization";
export const XHasuraAdminSecret = "X-Hasura-Admin-Secret";
export const XHasuraClientName = "hasura-client-name";

export type Maybe<T> = T | null | undefined;

export type AnyObject = { readonly [key: string]: any };
export type StoreProps = {
  readonly store: Store
};
export type I18nProps = {
  readonly i18n: I18nState
};
