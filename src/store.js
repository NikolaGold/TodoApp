import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import {allReducer} from "./reducer";
import {rootSaga} from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = compose(
    applyMiddleware(sagaMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : ((f) => f),
);

export const store = createStore(allReducer, middleware);

sagaMiddleware.run(rootSaga);

store.dispatch({type: 'TODOS_FETCH'});