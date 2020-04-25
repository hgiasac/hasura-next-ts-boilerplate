import sagaMonitor from "@redux-saga/simple-saga-monitor";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";

export default function configureStore(rootReducer, rootSaga, initialState) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, createLogger()),
    ),
  );

  const _store = store as any;
  _store.sagaTask = sagaMiddleware.run(rootSaga);
  _store.close = () => store.dispatch(END);

  return store;
}
