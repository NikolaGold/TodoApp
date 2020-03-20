export const getTodos = (state) => state.get('todos');

export const getFilterItemByStatus = (state) => state.get('filter').filterItemsByStatus;

export const getErrorMessage = (state) => state.get('error').errorMessage;

export const getFilterTodos = (state) => {
    const todos = getTodos(state);
    const filterItemByStatus = getFilterItemByStatus(state);
    if (filterItemByStatus === 'complete'){
        return todos.filter((todo) => todo.get('completed'));

    } else if (filterItemByStatus === 'incomplete'){
        return todos.filter((todo) => !todo.get('completed'));
    } else
        return state.get('todos');
};
