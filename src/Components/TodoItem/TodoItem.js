import React, {useState} from "react";
import {connect} from "react-redux";
import moment from "moment";
import Button from "react-bootstrap/Button";

import "./TodoItem.css"
import {completeTodoItem, removeTodoItem, changeTodoItem} from "../../actions";

export const TodoItemComponent = ({text, complete, onCompleteTodoItem, onRemoveTodoItem, onChangeTodoItem, createdDate}) => {
    const [isEditTodoItem, setIsTodoEditItem] = useState(false);
    const [todoItemText, setChangeTextItem] = useState(text);
    const clickOnEnter = (event) => {
        if (event.keyCode === 13) {
            setIsTodoEditItem(!isEditTodoItem);
            onChangeTodoItem(todoItemText)
        }
    };
    return (
        <tr className="row">
            <td className="col-1">
                <input type="checkbox" checked={complete} onChange={() => onCompleteTodoItem()}/>
            </td>
            <td className="col-2">
                {moment(createdDate).format('DD-MM-YYYY')}
            </td>
            <td onDoubleClick={() => !isEditTodoItem && setIsTodoEditItem(!isEditTodoItem)} className={complete ? "complete-todo-item col-7" : "col-7"} >
                {isEditTodoItem ?
                    (<input type="text"
                            className="form-control"
                            value={todoItemText}
                            onKeyDown={(e) => clickOnEnter(e)}
                            onChange={(event) => setChangeTextItem(event.target.value)}/>)
                    :
                    text
                }
            </td>
            <td className="col-1">
                {!isEditTodoItem ? (
                    <Button
                        className="btn-dark"
                        onClick={() => {setIsTodoEditItem(!isEditTodoItem)}}
                    >
                        Edit
                    </Button>
                    ) :
                    (
                        <Button
                            className="btn-success"
                            onClick={() => {
                                setIsTodoEditItem(!isEditTodoItem);
                                onChangeTodoItem(todoItemText)}}
                        >
                            ✔
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

const mapDispatchToProps = (dispatch, {complete, id}) => ({
    onCompleteTodoItem: () => dispatch(completeTodoItem(complete, id)),
    onRemoveTodoItem: () => dispatch(removeTodoItem(id)),
    onChangeTodoItem: (changeText) => dispatch(changeTodoItem(id, changeText)),

});

const mergeProps = (mapStateProps, {onCompleteTodoItem, onRemoveTodoItem, onChangeTodoItem}, {text, complete, visible, createdDate}) => ({
    text,
    complete,
    visible,
    createdDate,
    onCompleteTodoItem,
    onRemoveTodoItem,
    onChangeTodoItem,
});

const TodoItem = connect(undefined, mapDispatchToProps, mergeProps)(TodoItemComponent);

export default TodoItem;
