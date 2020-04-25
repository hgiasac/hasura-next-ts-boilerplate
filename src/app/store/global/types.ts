import { Action } from "redux";

export const OPEN_MOBILE_SIDEBAR = "OPEN_MOBILE_SIDEBAR";
export const CLOSE_MOBILE_SIDEBAR = "CLOSE_MOBILE_SIDEBAR";

export type GlobalActionType
  = typeof OPEN_MOBILE_SIDEBAR
  | typeof CLOSE_MOBILE_SIDEBAR;

export interface IGlobalState {
  mobileSidebarVisibility: boolean;
}

export interface IReadonlyAction<T> extends Action<T> {
  readonly type: T;
}

export type OpenMobileSidebarAction = IReadonlyAction<typeof OPEN_MOBILE_SIDEBAR>;
export type CloseMobileSidebarAction = IReadonlyAction<typeof CLOSE_MOBILE_SIDEBAR>;

export type GlobalAction
  = OpenMobileSidebarAction
  | CloseMobileSidebarAction;
