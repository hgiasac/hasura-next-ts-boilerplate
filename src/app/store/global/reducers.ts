import { Reducer } from "redux";
import { CLOSE_MOBILE_SIDEBAR, GlobalAction, IGlobalState, OPEN_MOBILE_SIDEBAR } from "./types";

export const initialGlobalState: IGlobalState = {
  mobileSidebarVisibility: false
};

const reducer: Reducer<IGlobalState, GlobalAction> = (state = initialGlobalState, action) => {
  switch (action.type) {
    case OPEN_MOBILE_SIDEBAR:
      return { ...state, mobileSidebarVisibility: true };
    case CLOSE_MOBILE_SIDEBAR:
      return { ...state, mobileSidebarVisibility: false };
    default:
      return state;
  }
};

export default reducer;
