import {combineReducers} from 'redux-immutable';
import {
    TODOS_FETCH_ITEM,
    SET_NEW_TODO_ITEMS,
    FILTER_COMPLETE_ITEMS,
    FILTER_INCOMPLETE_ITEMS,
    FILTER_ALL_ITEMS,
    TODOS_FETCH_FAILED,
    ADD_TODD_ITEM_FAILED,
    COMPLETE_TODO_ITEM_FAILED,
    REMOVE_TODO_ITEM_FAILED,
    CHANGE_TODO_ITEM_FAILED,
    REMOVE_ALL_TODO_ITEM_FAILED,
    COMPLETE_VISIBLE_TODOS_FAILED,
    REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED,

} from "./actions";

const setTodosReducer = (state = [], action) => {
    switch (action.type) {
        case TODOS_FETCH_ITEM:
            return action.todos;
        case SET_NEW_TODO_ITEMS :
            return action.todos;
        default:
            return state;
    }
};

const setFilterReducer = (state = '', action) => {
    switch (action.type) {
        case FILTER_COMPLETE_ITEMS:
            return {...state, filterItemsByStatus: 'complete'};
        case FILTER_INCOMPLETE_ITEMS:
            return {...state, filterItemsByStatus: 'incomplete'};
        case FILTER_ALL_ITEMS:
            return {...state, filterItemsByStatus: 'all'};
        default:
            return state;
    }
};

const errorReducer = (state = '', action) => {
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
        case REMOVE_ALL_TODO_ITEM_FAILED:
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
    todos: setTodosReducer,
    filter: setFilterReducer,
    error: errorReducer,
});
