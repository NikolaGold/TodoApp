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


const TodoActionButtons = ({
                               onRemoveAllTodoItems,
                               onRemoveCompleteTodoItems,
                               onShowCompleteTodoItems,
                               onShowIncompleteTodoItems,
                               onShowAllTodoItems,
                               onCompleteVisibleTodoItems,
}) => {

    return(
        <div className="d-flex justify-content-center">
            <Button onClick={() => onCompleteVisibleTodoItems()}  className="layout-button btn-warning">
                Complete visible Tasks
            </Button>
            <Button className="layout-button btn-info" onClick={() => onShowCompleteTodoItems()}>
                Show complete tasks
            </Button>
            <Button className="layout-button btn-info" onClick={() => onShowIncompleteTodoItems()}>
                Show incomplete tasks
            </Button>
            <Button className="layout-button btn-info" onClick={() => onShowAllTodoItems()}>
                Show all tasks
            </Button>
            <Button className="layout-button btn-danger" onClick={() => onRemoveCompleteTodoItems()}>
                Remove all complete tasks
            </Button>
            <Button className="layout-button btn-danger" onClick={() => onRemoveAllTodoItems()}>
                Remove all tasks
            </Button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    onShowCompleteTodoItems: () => dispatch(filterCompleteItems()),
    onShowIncompleteTodoItems: () => dispatch(filterIncompleteItems()),
    onShowAllTodoItems: () => dispatch(filterAllItems()),
    onRemoveCompleteTodoItems: () => dispatch(removeAllCompleteTodoItems()),
    onRemoveAllTodoItems: () => dispatch(removeAllTodoItems()),
    onCompleteVisibleTodoItems: () => dispatch(completeVisibleTodoItems())

});

const mergeProps = (
        mapStateProps,
        {onShowCompleteTodoItems, onShowIncompleteTodoItems, onRemoveCompleteTodoItems, onRemoveAllTodoItems, onShowAllTodoItems, onCompleteVisibleTodoItems},
        ) => ({
    onShowCompleteTodoItems,
    onShowIncompleteTodoItems,
    onRemoveCompleteTodoItems,
    onRemoveAllTodoItems,
    onShowAllTodoItems,
    onCompleteVisibleTodoItems,
});

export default connect(undefined, mapDispatchToProps, mergeProps)(TodoActionButtons);