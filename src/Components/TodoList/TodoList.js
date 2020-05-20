import React from "react";
import {connect} from 'react-redux';

import TodoItem from "../TodoItem/TodoItem";
import NewTodoItem from "../NewTodoItem/NewTodoItem";
import TodoModal from "../Modal/Modal";
import TodoActionButtons from "../TodoActionButtons/TodoActionButtons";
import {
    getFilteredTodos,
    getFilterItemByStatus,
    getErrorMessage,
    getCompletedTodos,
    getIsLoading
} from "../../selectors";
import {displayLoading} from "./helperFunctions";
import "./TodoList.css";

const TodoListComponent = ({todos, isLoading, completedTodos, errorMessage}) => {
    return (
        <div className="TodoApp-layout">
            <h1 className="d-flex justify-content-center"> TodoApp</h1>
            {errorMessage &&
            <TodoModal
                title="Error"
                message={errorMessage}
                textOnButton="Click to display error"
            />
            }
            <NewTodoItem/>
            {todos.length > 0 ?
                <table className="container table table-striped table-sm">
                    <tbody>
                    {todos.map((todo) =>
                        <TodoItem
                            key={todo.get('id')}
                            id={todo.get('id')}
                            text={todo.get('text')}
                            completed={todo.get('completed')}
                            createdDate={todo.get('createdDate')}
                            visible={todo.get('visible')}
                        />
                    )}
                    </tbody>
                </table>
                : displayLoading(isLoading)
            }
            <TodoActionButtons/>
            <div className="d-flex justify-content-center">
                Number of complete tasks: {completedTodos.length}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: getFilteredTodos(state),
    filterItemByStatus: getFilterItemByStatus(state),
    errorMessage: getErrorMessage(state),
    completedTodos: getCompletedTodos(state),
    isLoading: getIsLoading(state),
});

const TodoList = connect(mapStateToProps)(TodoListComponent);
export default TodoList;
