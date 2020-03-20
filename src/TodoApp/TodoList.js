import React from "react";
import {connect} from 'react-redux';

import TodoItem from "./TodoItem/TodoItem";
import NewTodoItem from "./NewTodoItem/NewTodoItem";
import {getFilterTodos, getFilterItemByStatus, getErrorMessage} from "../selectors";
import TodoActionButtons from "./TodoActionButtons/TodoActionButtons";
import "./TodoList.css"
import {TodoModal} from "./Modal/Modal";

const TodoListContainer = ({todos, filterItemByStatus, errorMessage}) =>  {
    return (
        <div className="TodoApp-layout" >
            <h1 className="d-flex justify-content-center"> TodoApp </h1>
            {errorMessage &&
            <TodoModal
                title="Error"
                message={errorMessage}
            />
            }
            <NewTodoItem />
            {todos.length <= 0 ?
                filterItemByStatus === 'complete' ||  filterItemByStatus === 'incomplete' || filterItemByStatus ===  'all' ?
                <div className="d-flex justify-content-center">0 task</div>
                :
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <table className="table table-striped table-sm">
                    <tbody>
                    {todos.map((todo) =>
                        <TodoItem
                            key={todo.get('id')}
                            id={todo.get('id')}
                            text={todo.get('text')}
                            complete={todo.get('completed')}
                            visible={todo.get('visible')}
                        />
                    )}
                    </tbody>
                </table>
            }
            <TodoActionButtons />
            <div className="d-flex justify-content-center">Number of complete tasks: {todos.filter((item) => item.get('completed') === true).length}</div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: getFilterTodos(state),
    filterItemByStatus: getFilterItemByStatus(state),
    errorMessage: getErrorMessage(state),
});

const TodoList = connect(mapStateToProps)(TodoListContainer);
export default TodoList;