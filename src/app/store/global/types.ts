import { ReadonlyAction } from "../types";
import { AuthUser } from "../../shared/auth";

export const OPEN_MOBILE_SIDEBAR = "OPEN_MOBILE_SIDEBAR";
export const CLOSE_MOBILE_SIDEBAR = "CLOSE_MOBILE_SIDEBAR";
export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATE = "UNAUTHENTICATE";
export const INITIAL_LOAD = "INITIAL_LOAD";

export type GlobalActionType
  = typeof OPEN_MOBILE_SIDEBAR
  | typeof CLOSE_MOBILE_SIDEBAR
  | typeof AUTHENTICATE
  | typeof UNAUTHENTICATE
  | typeof INITIAL_LOAD;

export type GlobalState = {
  readonly initialLoading: boolean
  readonly isAuthenticated: boolean
  readonly authUser: AuthUser | null
};

export type AuthenticateAction = {
  readonly type: typeof AUTHENTICATE
  readonly payload: AuthUser
};

export type OpenMobileSidebarAction = ReadonlyAction<typeof OPEN_MOBILE_SIDEBAR>;
export type CloseMobileSidebarAction = ReadonlyAction<typeof CLOSE_MOBILE_SIDEBAR>;
export type UnauthenticateAction = ReadonlyAction<typeof UNAUTHENTICATE>;
export type InitialLoadAction = {
  readonly type: typeof INITIAL_LOAD
  readonly payload: boolean
};

export type GlobalAction
  = OpenMobileSidebarAction
  | CloseMobileSidebarAction
  | AuthenticateAction
  | UnauthenticateAction
  | InitialLoadAction;
