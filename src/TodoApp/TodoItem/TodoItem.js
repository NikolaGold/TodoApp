import React, {useState} from "react";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import "./TodoItem.css"

import {completeTodoItem, removeTodoItem, changeTodoItem} from "../../actions";

export const TodoItemComponent = ({text, complete, onCompleteTodoItem, onRemoveTodoItem, onChangeTodoItem}) => {
    const [editTodoItem, setTodoEditItem] = useState(false);
    const [changeTextItem, setChangeTextItem] = useState(text);
    const clickOnEnter = (event) => {
        if (event.keyCode === 13) {
            setTodoEditItem(!editTodoItem);
            onChangeTodoItem(changeTextItem)
        }
    };
    return (
        <>
                <tr className="col-3">
                    <td><input type="checkbox" checked={complete} onChange={() => onCompleteTodoItem()}/></td>
                    <td onDoubleClick={() => !editTodoItem && setTodoEditItem(!editTodoItem)} className={complete ? "todo-item col-5" : "col-5"} >
                        {editTodoItem ?
                            (<input type="text"
                                    className="form-control"
                                    value={changeTextItem}
                                    onKeyDown={(e) => clickOnEnter(e)}
                                    onChange={(event) => setChangeTextItem(event.target.value)}/>) : text
                        }
                    </td>
                    <td className="col-2">
                        {!editTodoItem ? (
                                <Button
                                    className="btn-dark"
                                    onClick={() => {
                                    setTodoEditItem(!editTodoItem)
                                }}>
                                    Edit
                                </Button>
                            ) :
                            (

                                <Button
                                    className="btn-success"
                                    onClick={() => {
                                    setTodoEditItem(!editTodoItem);
                                    onChangeTodoItem(changeTextItem)
                                }}>
                                    ✔
                                </Button>
                            )}
                    </td>
                    <td className="col-2">
                        <Button className="btn-danger" onClick={() => onRemoveTodoItem()}>x</Button>
                    </td>
                </tr>
       </>
    )
};

const mapDispatchToProps = (dispatch, {complete, id}) => ({
    onCompleteTodoItem: () => dispatch(completeTodoItem(complete, id)),
    onRemoveTodoItem: () => dispatch(removeTodoItem(id)),
    onChangeTodoItem: (changeText) => dispatch(changeTodoItem(id, changeText)),

});

const mergeProps = (mapStateProps, {onCompleteTodoItem, onRemoveTodoItem, onChangeTodoItem}, {text, complete, visible}) => ({
    text,
    complete,
    visible,
    onCompleteTodoItem,
    onRemoveTodoItem,
    onChangeTodoItem,
});

export default connect(undefined, mapDispatchToProps, mergeProps)(TodoItemComponent);