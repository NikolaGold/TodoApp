export const TODOS_FETCH = 'TODOS_FETCH';
export const TODOS_FETCH_ITEM = 'TODOS_FETCH_ITEM';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';
export const REMOVE_ALL_TODO_ITEMS = 'REMOVE_ALL_TODO_ITEMS';
export const REMOVE_ALL_COMPLETE_TODO_ITEMS = 'REMOVE_ALL_COMPLETE_TODO_ITEMS';
export const CHANGE_TODO_ITEM = 'CHANGE_TODO_ITEM';
export const TOGGLE_COMPLETE_TODO_ITEM = 'TOGGLE_COMPLETE_TODO_ITEM';
export const SET_NEW_TODO_ITEM = 'SET_NEW_TODO_ITEM';
export const COMPLETE_VISIBLE_TODO_ITEMS = 'COMPLETE_VISIBLE_TODO_ITEMS';

export const FILTER_COMPLETE_ITEMS = 'FILTER_COMPLETE_ITEMS';
export const FILTER_INCOMPLETE_ITEMS = 'FILTER_INCOMPLETE_ITEMS';
export const FILTER_ALL_ITEMS = 'FILTER_ALL_ITEMS';

export const TODOS_FETCH_FAILED = 'TODOS_FETCH_FAILED';
export const ADD_TODD_ITEM_FAILED = 'ADD_TODD_ITEM_FAILED';
export const COMPLETE_TODO_ITEM_FAILED = 'COMPLETE_TODO_ITEM_FAILED';
export const CHANGE_TODO_ITEM_FAILED = 'CHANGE_TODO_ITEM_FAILED';
export const REMOVE_TODO_ITEM_FAILED = 'REMOVE_TODO_ITEM_FAILED';
export const COMPLETE_VISIBLE_TODOS_FAILED = 'COMPLETE_VISIBLE_TODOS_FAILED';
export const REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED = 'REMOVE_ALL_COMPLETE_TODO_ITEM_FAILED';
export const REMOVE_ALL_TODOS_FAILED = 'REMOVE_ALL_TODOS_FAILED';

export const LOADING_TODOS = 'LOADING_TODOS';

export const todosFetchItem = (todos) => ({
    type: TODOS_FETCH_ITEM,
    todos,
});

export const toggleCompleteTodoItem = (isComplete, id) => ({
    type: TOGGLE_COMPLETE_TODO_ITEM,
    isComplete,
    id,
});

export const setNewTodoItem = (todo) => ({
    type: SET_NEW_TODO_ITEM,
    todo,
});

export const removeTodoItem = (id) => ({
    type: REMOVE_TODO_ITEM,
    id,
});

export const removeAllTodoItems = (todos) => ({
    type: REMOVE_ALL_TODO_ITEMS,
    todos,
});

export const removeAllCompleteTodoItems = (todos) => ({
    type: REMOVE_ALL_COMPLETE_TODO_ITEMS,
    todos,
});

export const changeTodoItem = (id, text) => ({
    type: CHANGE_TODO_ITEM,
    id,
    text,
});

export const addTodoItem = (text) => ({
    type: ADD_TODO_ITEM,
    text,
});

export const completeVisibleTodoItems = (filterTodos) => ({
    type: COMPLETE_VISIBLE_TODO_ITEMS,
    filterTodos,
});

export const filterCompleteItems = () => ({
    type: FILTER_COMPLETE_ITEMS,
});

export const filterIncompleteItems = () => ({
    type: FILTER_INCOMPLETE_ITEMS,
});

export const filterAllItems = () => ({
    type: FILTER_ALL_ITEMS,
});

export const loadingTodos = (isLoading) => ({
    type: LOADING_TODOS,
    isLoading,
});
