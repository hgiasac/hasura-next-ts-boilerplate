import { Store } from "redux";
import configureStore from "../shared/vendor/redux/configureStore";
import rootReducer, { defaultState } from "./reducers";
import rootSaga from "./sagas";
import { IAppState } from "./types";

export default (initialState = defaultState): Store<IAppState> =>
  configureStore(rootReducer, rootSaga, initialState);
