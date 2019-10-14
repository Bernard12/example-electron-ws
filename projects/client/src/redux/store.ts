import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { ApplicationNetworkState, IApplicationState } from "./domain";
import { rootReducer } from "./reducers";
import { mySaga } from "./sagas";

const baseStore: IApplicationState = {
    isLoading: ApplicationNetworkState.NOT_CONNECTED,
    messages: []
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, baseStore, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
export default store;

