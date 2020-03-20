export const Api = {
    baseURL: 'http://localhost:8080/',
    todos: 'todos',
};

export const fetchGetData = async function(parameter){
    return await fetch(Api.baseURL + parameter, {method: 'GET'})
        .then(response => response.json());
};

export const addTodoItem = async function(todoText) {
    const result = await fetch(Api.baseURL + Api.todos, {
        method: 'POST', body: JSON.stringify({text: todoText}),
        headers: {'Content-Type': 'application/json'}
    });
    return result.json();
};

export const changeTodoItem = async function(changeTodoText, todoId) {
    const result = await fetch(Api.baseURL + Api.todos + '/' + todoId, {
        method: 'POST', body: JSON.stringify({text: changeTodoText}),
        headers: {'Content-Type': 'application/json'}
    });
    return result.json();
};

export const removeTodoItem = async function(todoId) {
    return await fetch(Api.baseURL + Api.todos + '/' + todoId, {
        method: 'DELETE',
    });
};

export const completeTodoItem = async function(todoId, complete) {
    if(complete) {
        const result = await fetch(Api.baseURL + Api.todos + '/' + todoId + '/incomplete', {method: 'POST'}
        );
        return result.json();
    } else{
        const result = await fetch(Api.baseURL + Api.todos + '/' + todoId + '/complete', {method: 'POST'}
        );
        return result.json();
    }
};
