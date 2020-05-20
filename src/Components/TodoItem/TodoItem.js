import React, {useState} from "react";
import {connect} from "react-redux";
import moment from "moment";
import Button from "react-bootstrap/Button";

import "./TodoItem.css"
import {toggleCompleteTodoItem, removeTodoItem, changeTodoItem} from "../../actions";

export const TodoItemComponent = ({text, completed, onToggleComplete, onRemoveTodoItem, onChangeTodoItem, createdDate}) => {
    const [isInEditMode, setEditMode] = useState(false);
    const [textItem, setChangeText] = useState(text);

    const handleEditMode = () => {
        !isInEditMode && setEditMode(!isInEditMode)
    };
    const onSubmit = (event) => {
        if (event.keyCode === 13) {
            setEditMode(!isInEditMode);
            onChangeTodoItem(textItem);
        }
    };

    return (
        <tr className="row">
            <td className="col-1">
                <input type="checkbox" checked={completed} onChange={() => onToggleComplete()}/>
            </td>
            <td className="col-2">
                {moment(createdDate).format('DD-MM-YYYY')}
            </td>
            <td
                onDoubleClick={() => handleEditMode()}
                className={completed ? "complete-todo-item col-7" : "col-7"}
            >
                {isInEditMode ?
                    (<input type="text"
                            className="form-control"
                            value={textItem}
                            onKeyDown={(e) => onSubmit(e)}
                            onChange={(event) => setChangeText(event.target.value)}/>)
                    :
                    text
                }
            </td>
            <td className="col-1">
                {isInEditMode ?
                    (
                        <Button
                            className="btn-success"
                            onClick={() => {
                                setEditMode(!isInEditMode);
                                onChangeTodoItem(textItem)
                            }}
                        >
                            ✔
                        </Button>
                    ) :
                    (
                        <Button
                            className="btn-dark"
                            onClick={() => {
                                setEditMode(!isInEditMode)
                            }}
                        >
                            Edit
                        </Button>
                    )
                }
            </td>
            <td className="col-1">
                <Button className="btn-danger" onClick={() => onRemoveTodoItem()}>
                    x
                </Button>
            </td>
        </tr>
    )
};

const mapDispatchToProps = (dispatch, {completed, id}) => ({
    onToggleComplete: () => dispatch(toggleCompleteTodoItem(completed, id)),
    onRemoveTodoItem: () => dispatch(removeTodoItem(id)),
    onChangeTodoItem: (changeText) => dispatch(changeTodoItem(id, changeText)),

});

const mergeProps = (mapStateProps, {onToggleComplete, onRemoveTodoItem, onChangeTodoItem}, {text, completed, visible, createdDate}) => ({
    text,
    completed,
    visible,
    createdDate,
    onToggleComplete,
    onRemoveTodoItem,
    onChangeTodoItem,
});

const TodoItem = connect(undefined, mapDispatchToProps, mergeProps)(TodoItemComponent);

export default TodoItem;
