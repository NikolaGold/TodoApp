import {put, takeLatest, call} from "redux-saga/effects";
import {Map} from "immutable";

import {
    TOGGLE_COMPLETE_TODO_ITEM,
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
    loadingTodos,
} from "./actions";
import {
    fetchGetData,
    addTodoItem,
    changeTodoItem,
    removeTodoItem,
    completeTodoItem,
    inCompleteTodoItem
} from "./Api/Api"

export const rootSaga = function* rootSaga() {
    yield takeLatest(TODOS_FETCH, fetchTodoListSaga);
    yield takeLatest(TOGGLE_COMPLETE_TODO_ITEM, completeTodoSaga);
    yield takeLatest(REMOVE_TODO_ITEM, removeTodoItemSaga);
    yield takeLatest(REMOVE_ALL_TODO_ITEMS, removeAllTodoItemsSaga);
    yield takeLatest(CHANGE_TODO_ITEM, changeTodoItemSaga);
    yield takeLatest(ADD_TODO_ITEM, addTodoItemSaga);
    yield takeLatest(REMOVE_ALL_COMPLETE_TODO_ITEMS, removeAllCompleteTodoItemsSaga);
    yield takeLatest(COMPLETE_VISIBLE_TODO_ITEMS, completeVisibleTodoItemsSaga);
};

export const fetchTodoListSaga = function* fetchTodoListSaga() {
    try {
        yield put(loadingTodos(true));
        const todos = yield call(fetchGetData, 'todos');
        yield put(todosFetchItem(todos.map((item) => Map(item))));
        yield put(loadingTodos(false));
    } catch (e) {
        yield put({type: TODOS_FETCH_FAILED, message: e.message});
    }
};

export const addTodoItemSaga = function* addTodoItemSaga({text}) {
    try {
        const newItem = yield call(addTodoItem, text);
        yield put(setNewTodoItem(newItem));
    } catch (e) {
        yield put({type: ADD_TODD_ITEM_FAILED, message: e.message});
    }
};

export const completeTodoSaga = function* completeTodoSaga({isComplete, id}) {
    try {
        if (isComplete) {
            yield call(inCompleteTodoItem, id, isComplete);
        } else {
            yield call(completeTodoItem, id, isComplete);
        }
    } catch (e) {
        yield put({type: COMPLETE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const removeTodoItemSaga = function* removeTodoItemSaga({id}) {
    try {
        yield put(loadingTodos(true));
        yield call(removeTodoItem, id);
        yield put(loadingTodos(false));
    } catch (e) {
        yield put({type: REMOVE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const changeTodoItemSaga = function* changeTodoItemSaga({id, text}) {
    try {
        yield call(changeTodoItem, text, id);
    } catch (e) {
        yield put({type: CHANGE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const removeAllCompleteTodoItemsSaga = function* removeAllCompleteTodoItemsSaga({todos}) {
    try {
        const removeAllCompleteTodoItems = (todos) => todos.map((item) => {
            if (item.get('completed')) {
                return removeTodoItem(item.get('id'))
            }
            return item
        });
        yield put(loadingTodos(true));
        yield call(removeAllCompleteTodoItems, todos);
        yield put(loadingTodos(false));
    } catch (e) {
        yield put({type: REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED, message: e.message});
    }
};

export const completeVisibleTodoItemsSaga = function* completeVisibleTodoItemsSaga({filterTodos}) {
    try {
        const completeTodoItems = (todos) => todos.map((item) => {
            if (!item.get('completed')) {
                return completeTodoItem(item.get('id'))
            }
            return item
        });
        yield put(loadingTodos(true));
        yield call(completeTodoItems, filterTodos);
        yield put(loadingTodos(false));
    } catch (e) {
        yield put({type: COMPLETE_VISIBLE_TODOS_FAILED, message: e.message});
    }
};

export const removeAllTodoItemsSaga = function* removeAllTodoItemsSaga({todos}) {
    try {
        const removeAllCompleteTodoItems = (items) => items.map((item) => removeTodoItem(item.get('id')));
        yield put(loadingTodos(true));
        yield call(removeAllCompleteTodoItems, todos);
        yield put(loadingTodos(false));
    } catch (e) {
        yield put({type: REMOVE_ALL_TODOS_FAILED, message: e.message});
    }
};
