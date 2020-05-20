import React from "react";
import Button from 'react-bootstrap/Button';

import {
    removeAllTodoItems,
    removeAllCompleteTodoItems,
    filterCompleteItems,
    filterIncompleteItems,
    filterAllItems,
    completeVisibleTodoItems,
} from "../../actions";
import {connect} from "react-redux";
import "./TodoActionButtons.css";
import {getFilteredTodos, getTodos} from "../../selectors";


const TodoActionButtonsComponent = ({
                                        onRemoveAllTodoItems,
                                        onRemoveCompleteTodoItems,
                                        onShowCompleteTodoItems,
                                        onShowIncompleteTodoItems,
                                        onShowAllTodoItems,
                                        onCompleteVisibleTodoItems,
                                        todos,
                                        filterTodos,
                                    }) => (
    <div className="d-flex justify-content-center">
        <Button onClick={() => onCompleteVisibleTodoItems(filterTodos)} className="layout-button btn-warning">
            Complete visible Tasks
        </Button>
        <Button className="todo-action-button btn-info" onClick={() => onShowCompleteTodoItems()}>
            Show complete tasks
        </Button>
        <Button className="todo-action-button btn-info" onClick={() => onShowIncompleteTodoItems()}>
            Show incomplete tasks
        </Button>
        <Button className="todo-action-button btn-info" onClick={() => onShowAllTodoItems()}>
            Show all tasks
        </Button>
        <Button className="todo-action-button btn-danger" onClick={() => onRemoveCompleteTodoItems(todos)}>
            Remove all complete tasks
        </Button>
        <Button className="todo-action-button btn-danger" onClick={() => onRemoveAllTodoItems(todos)}>
            Remove all tasks
        </Button>
    </div>
);

const mapStateToProps = (state) => ({
    todos: getTodos(state),
    filterTodos: getFilteredTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
    onShowCompleteTodoItems: () => dispatch(filterCompleteItems()),
    onShowIncompleteTodoItems: () => dispatch(filterIncompleteItems()),
    onShowAllTodoItems: () => dispatch(filterAllItems()),
    onRemoveCompleteTodoItems: (todos) => dispatch(removeAllCompleteTodoItems(todos)),
    onRemoveAllTodoItems: (todos) => dispatch(removeAllTodoItems(todos)),
    onCompleteVisibleTodoItems: (filterTodos) => dispatch(completeVisibleTodoItems(filterTodos))

});

const mergeProps = (
    {todos, filterTodos},
    {onShowCompleteTodoItems, onShowIncompleteTodoItems, onRemoveCompleteTodoItems, onRemoveAllTodoItems, onShowAllTodoItems, onCompleteVisibleTodoItems},
) => ({
    todos,
    filterTodos,
    onShowCompleteTodoItems,
    onShowIncompleteTodoItems,
    onRemoveCompleteTodoItems,
    onRemoveAllTodoItems,
    onShowAllTodoItems,
    onCompleteVisibleTodoItems,
});

const TodoActionButtons = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TodoActionButtonsComponent);

export default TodoActionButtons;
