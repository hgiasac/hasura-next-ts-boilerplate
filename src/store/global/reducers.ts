import { Reducer } from "redux";
import * as types from "./types";

export const initialGlobalState: types.GlobalState = {
  mobileSidebarVisibility: false,
  isAuthenticated: false,
  authUser: null
};

const reducer: Reducer<types.GlobalState, types.GlobalAction> = (state = initialGlobalState, action) => {
  switch (action.type) {
    case types.OPEN_MOBILE_SIDEBAR:
      return { ...state, mobileSidebarVisibility: true };
    case types.CLOSE_MOBILE_SIDEBAR:
      return { ...state, mobileSidebarVisibility: false };
    case types.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        authUser: action.payload
      };
    case types.UNAUTHENTICATE:
      return {
        ...state,
        isAuthenticated: false,
        authUser: null
      };
    default:
      return state;
  }
};

export default reducer;
