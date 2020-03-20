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
    todosFetchItem,
    setNewTodoItems,
    filterAllItems,
} from "./actions";
import {getTodos, getFilterTodos} from "./selectors";
import {Api, fetchGetData, addTodoItem, changeTodoItem, removeTodoItem, completeTodoItem} from "./Api/Api"

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
        const todos = yield call(fetchGetData, Api.todos);
        if (!todos.length) {
            yield put(filterAllItems())
        }
        yield put(todosFetchItem(todos.map((item) => Map(item))))
    }
    catch (e) {
        yield put({type: 'TODOS_FETCH_FAILED', message: e.message});
    }
};

export const addTodoItemSaga = function* addTodoItemSaga({text}){
    try {
        const todos = yield select(getTodos);
        const newItem = yield call(addTodoItem, text);
        const newTodoItems = [Map(newItem), ...todos];
        yield put(setNewTodoItems(newTodoItems));
    }
    catch (e){
        yield put({type: 'ADD_TODD_ITEM_FAILED', message: e.message});
    }
};

export const completeTodoSaga = function* completeTodoSaga({complete, id}) {
    try {
        const todos = yield select(getTodos);
        const newTodoItems = todos.map((item) => {
            let newItem;
            if (item.get('id') === id) {
                newItem = item.set('completed', !complete)
            } else {
                newItem = item
            }
            return newItem
        });
        yield put(setNewTodoItems(newTodoItems));
        yield call(completeTodoItem, id, complete);
    }
    catch (e) {
        yield put({type: 'COMPLETE_TODO_ITEM_FAILED', message: e.message});
    }
};

export const removeTodoItemSaga = function* removeTodoItemSaga({id}) {
    try {
        yield call(removeTodoItem, id);
        const todos = yield select(getTodos);
        const newTodoItems = todos.filter((item) => item.get('id') !== id);
        yield put(setNewTodoItems(newTodoItems));
        yield put(filterAllItems())
    }
    catch (e) {
        yield put({type: 'REMOVE_TODO_ITEM_FAILED', message: e.message});
    }
};

export const changeTodoItemSaga = function* changeTodoItemSaga({id, text}) {
    try {
        const todos = yield select(getTodos);
        const newTodoItems = todos.map((item) => {
            let newItem;
            if (item.get('id') === id) {
                newItem = item.set('text', text)
            } else {
                newItem = item
            }
            return newItem
        });
        yield call(changeTodoItem, text, id);
        yield put(setNewTodoItems(newTodoItems));
    }
    catch (e){
        yield put({type: 'CHANGE_TODO_ITEM_FAILED', message: e.message});
    }
};

export const removeAllCompleteTodoItemsSaga = function* removeAllCompleteTodoItemsSaga(){
    try {
        const todos = yield select(getTodos);
        const newTodoItems = todos.filter((item) => !item.get('completed'));
        const removeAllCompleteTodoItems = (todos) => todos.map((item) => {
            let result;
            if ((item.get('completed'))) {
                result = removeTodoItem(item.get('id'))
            }
            return result
        });
        yield call(removeAllCompleteTodoItems, todos);
        yield put(setNewTodoItems(newTodoItems));
    }
    catch (e) {
        yield put({type: 'REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED', message: e.message});
    }
};

export const completeVisibleTodoItemsSaga = function* completeVisibleTodoItemsSaga() {
    try {
        const todos = yield select(getTodos);
        const filterTodos = yield select(getFilterTodos);
        const newTodoItems = todos.map((item, index) => {
            let newTodos;
            if (item === filterTodos[index]) {
                newTodos = item.set('completed', true)
            } else {
                newTodos = item;
            }
            return newTodos
        });
        const completeTodoItem = (todos) => todos.map((item) => {
            let result;
            if (!(item.get('completed'))) {
                result = completeTodoItem(item.get('id'), false)
            }
            return result
        });
        yield call(completeTodoItem, filterTodos);
        yield put(setNewTodoItems(newTodoItems));
    }
    catch (e) {
        yield put({type: 'COMPLETE_VISIBLE_TODOS_FAILED', message: e.message});
    }
};

export const removeAllTodoItemsSaga = function* removeAllTodoItemsSaga(){
    try {
        const todos = yield select(getTodos);
        const removeAllCompleteTodoItems = (items) => items.map((item) => removeTodoItem(item.get('id')));
        yield call(removeAllCompleteTodoItems, todos);
        yield put(setNewTodoItems([]));
    }
    catch (e) {
        yield put({type: 'REMOVE_ALL_TODOS_FAILED', message: e.message});
    }
};
