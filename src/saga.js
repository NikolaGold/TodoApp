import {put, takeLatest, select, call} from "redux-saga/effects";
import {Map} from "immutable";

import {
    COMPLETE_TODO_ITEM,
    TODOS_FETCH,
    REMOVE_TODO_ITEM,
    CHANGE_TODO_ITEM,
    ADD_TODO_ITEM,
    REMOVE_ALL_TODO_ITEMS,
    REMOVE_ALL_COMPLETE_TODO_ITEMS,
    COMPLETE_VISIBLE_TODO_ITEMS,
    TODOS_FETCH_FAILED,
    ADD_TODD_ITEM_FAILED,
    COMPLETE_TODO_ITEM_FAILED,
    CHANGE_TODO_ITEM_FAILED,
    REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED,
    REMOVE_TODO_ITEM_FAILED,
    COMPLETE_VISIBLE_TODOS_FAILED,
    REMOVE_ALL_TODOS_FAILED,
    todosFetchItem,
    setNewTodoItem,
    filterAllItems,
} from "./actions";
import {getTodos, getFilterTodos} from "./selectors";
import {fetchGetData, addTodoItem, changeTodoItem, removeTodoItem, completeTodoItem, inCompleteTodoItem} from "./Api/Api"

export const rootSaga = function* rootSaga() {
    yield takeLatest(TODOS_FETCH, fetchTodoListSaga);
    yield takeLatest(COMPLETE_TODO_ITEM, completeTodoSaga);
    yield takeLatest(REMOVE_TODO_ITEM, removeTodoItemSaga);
    yield takeLatest(REMOVE_ALL_TODO_ITEMS, removeAllTodoItemsSaga);
    yield takeLatest(CHANGE_TODO_ITEM, changeTodoItemSaga);
    yield takeLatest(ADD_TODO_ITEM, addTodoItemSaga);
    yield takeLatest(REMOVE_ALL_COMPLETE_TODO_ITEMS, removeAllCompleteTodoItemsSaga);
    yield takeLatest(COMPLETE_VISIBLE_TODO_ITEMS, completeVisibleTodoItemsSaga);
};

export const fetchTodoListSaga = function* fetchTodoListSaga() {
    try {
        const todos = yield call(fetchGetData, 'todos');
        if (!todos.length) {
            yield put(filterAllItems())
        }
        yield put(todosFetchItem(todos.map((item) => Map(item))))
    }
    catch (e) {
        yield put({type: TODOS_FETCH_FAILED, message: e.message});
    }
};

export const addTodoItemSaga = function* addTodoItemSaga({text}){
    try {
        const newItem = yield call(addTodoItem, text);
        yield put(setNewTodoItem(newItem));
    }
    catch (e){
        yield put({type: ADD_TODD_ITEM_FAILED, message: e.message});
    }
};

export const completeTodoSaga = function* completeTodoSaga({complete, id}) {
    try {
        if(complete){
            yield call(inCompleteTodoItem, id, complete);
        } else {
            yield call(completeTodoItem, id, complete);
        }
    }
    catch (e) {
        yield put({type: COMPLETE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const removeTodoItemSaga = function* removeTodoItemSaga({id}) {
    try {
        yield call(removeTodoItem, id);
        yield put(filterAllItems())
    }
    catch (e) {
        yield put({type: REMOVE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const changeTodoItemSaga = function* changeTodoItemSaga({id, text}) {
    try {
        yield call(changeTodoItem, text, id);
    }
    catch (e){
        yield put({type: CHANGE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const removeAllCompleteTodoItemsSaga = function* removeAllCompleteTodoItemsSaga({todos}){
    try {
        const removeAllCompleteTodoItems = (todos) => todos.map((item) => {
            if (item.get('completed')) {
                return removeTodoItem(item.get('id'))
            } return item
        });
        yield call(removeAllCompleteTodoItems, todos);
    }
    catch (e) {
        yield put({type: REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const completeVisibleTodoItemsSaga = function* completeVisibleTodoItemsSaga({filterTodos}) {
    try {
        const completeTodoItems = (todos) => todos.map((item) => {
            if (!item.get('completed')) {
                return completeTodoItem(item.get('id'))
            } return item
        });
        yield call(completeTodoItems, filterTodos);
    }
    catch (e) {
        yield put({type: COMPLETE_VISIBLE_TODOS_FAILED, message: e.message});
    }
};

export const removeAllTodoItemsSaga = function* removeAllTodoItemsSaga(){
    try {
        const todos = yield select(getTodos);
        const removeAllCompleteTodoItems = (items) => items.map((item) => removeTodoItem(item.get('id')));
        yield call(removeAllCompleteTodoItems, todos);
        yield put(filterAllItems())
    }
    catch (e) {
        yield put({type: REMOVE_ALL_TODOS_FAILED, message: e.message});
    }
};
