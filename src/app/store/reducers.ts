import { combineReducers } from "redux";
import globalReducers, { initialGlobalState } from "./global/reducers";
import { IAppState } from "./types";

export const defaultState: IAppState = {
  global: initialGlobalState,
};

const rootReducer = combineReducers({
  global: globalReducers
});

export default rootReducer;
