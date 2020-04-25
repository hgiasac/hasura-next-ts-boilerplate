import sagaMonitor from "@redux-saga/simple-saga-monitor";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware, { END } from "redux-saga";

export default function configureStore(rootReducer, rootSaga, initialState) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  const anyStore = store as any;
  anyStore.sagaTask = sagaMiddleware.run(rootSaga);
  anyStore.close = () => store.dispatch(END);

  return store;
}
