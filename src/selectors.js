export const getTodos = (state) => state.get('todos');

export const getFilterItemByStatus = (state) => state.get('filter').filterItemsByStatus;

export const getErrorMessage = (state) => state.get('error').errorMessage;

export const getFilteredTodos = (state) => {
    const todos = getTodos(state);
    const filterItemByStatus = getFilterItemByStatus(state);
    if (filterItemByStatus === 'complete') {
        return todos.filter((todo) => todo.get('completed'));

    } else if (filterItemByStatus === 'incomplete') {
        return todos.filter((todo) => !todo.get('completed'));
    } else
        return todos;
};

export const getCompletedTodos = (state) => {
    const filteredTodos = getFilteredTodos(state);
    return filteredTodos.filter((todo) => todo.get('completed'))
};

export const getIsLoading = (state) => state.get('loading');
