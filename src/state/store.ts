import { createStore, Store, applyMiddleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { combinedReducer } from "./reducers";
import appSaga from "./sagas";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  combinedReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(appSaga);

export default store;
