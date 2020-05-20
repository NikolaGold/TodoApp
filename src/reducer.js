import {combineReducers} from 'redux-immutable';
import {Map} from "immutable";

import {
    TODOS_FETCH_ITEM,
    SET_NEW_TODO_ITEM,
    FILTER_COMPLETE_ITEMS,
    FILTER_INCOMPLETE_ITEMS,
    FILTER_ALL_ITEMS,
    TODOS_FETCH_FAILED,
    ADD_TODD_ITEM_FAILED,
    COMPLETE_TODO_ITEM_FAILED,
    REMOVE_TODO_ITEM_FAILED,
    CHANGE_TODO_ITEM_FAILED,
    REMOVE_ALL_TODOS_FAILED,
    COMPLETE_VISIBLE_TODOS_FAILED,
    REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED,
    TOGGLE_COMPLETE_TODO_ITEM,
    REMOVE_TODO_ITEM,
    CHANGE_TODO_ITEM,
    REMOVE_ALL_TODO_ITEMS,
    REMOVE_ALL_COMPLETE_TODO_ITEMS,
    COMPLETE_VISIBLE_TODO_ITEMS,
    LOADING_TODOS,
} from "./actions";

const todosReducer = (state = [], action) => {
    switch (action.type) {
        case TODOS_FETCH_ITEM:
            return action.todos;
        case SET_NEW_TODO_ITEM:
            return [Map(action.todo), ...state];
        case TOGGLE_COMPLETE_TODO_ITEM:
            return state.map((item) => {
                if (item.get('id') === action.id) {
                    return item.set('completed', !action.complete)
                } else {
                    return item
                }
            });
        case REMOVE_TODO_ITEM:
            return state.filter((item) => item.get('id') !== action.id);
        case CHANGE_TODO_ITEM:
            return state.map((item) => {
                if (item.get('id') === action.id) {
                    return item.set('text', action.text)
                } else {
                    return item
                }
            });
        case REMOVE_ALL_COMPLETE_TODO_ITEMS:
            return state.filter((item) => !item.get('completed'));
        case REMOVE_ALL_TODO_ITEMS:
            return [];
        case COMPLETE_VISIBLE_TODO_ITEMS:
            return state.map((item) => {
                if (action.filterTodos.includes(item) && !item.get('completed')) {
                    return item.set('completed', true)
                } else {
                    return item;
                }
            });
        default:
            return state;
    }
};

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case LOADING_TODOS:
            return action.isLoading;
        default:
            return {...state};
    }
};

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case FILTER_COMPLETE_ITEMS:
            return {...state, filterItemsByStatus: 'complete'};
        case FILTER_INCOMPLETE_ITEMS:
            return {...state, filterItemsByStatus: 'incomplete'};
        case FILTER_ALL_ITEMS:
            return {...state, filterItemsByStatus: 'all'};
        default:
            return {...state};
    }
};

const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case TODOS_FETCH_FAILED:
            return {...state, errorMessage: action.message};
        case ADD_TODD_ITEM_FAILED:
            return {...state, errorMessage: action.message};
        case COMPLETE_TODO_ITEM_FAILED:
            return {...state, errorMessage: action.message};
        case REMOVE_TODO_ITEM_FAILED:
            return {...state, errorMessage: action.message};
        case CHANGE_TODO_ITEM_FAILED:
            return {...state, errorMessage: action.message};
        case REMOVE_ALL_TODOS_FAILED:
            return {...state, errorMessage: action.message};
        case COMPLETE_VISIBLE_TODOS_FAILED:
            return {...state, errorMessage: action.message};
        case REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED:
            return {...state, errorMessage: action.message};
        default:
            return state;
    }
};


export const allReducer = combineReducers({
    todos: todosReducer,
    filter: filterReducer,
    loading: loadingReducer,
    error: errorReducer,
});
