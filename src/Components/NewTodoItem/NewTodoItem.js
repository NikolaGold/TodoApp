import React, {useState} from "react";
import {addTodoItem} from "../../actions";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';


const NewTodoItemComponent = ({onAddTodoItem}) => {
    const [text, setText] = useState('');

    const handleClick = () => {
        onAddTodoItem(text);
        setText('');
    };
    const onSubmit = (event) => {
        if (event.keyCode === 13) {
            handleClick();
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <input
                className="form-control"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(e) => onSubmit(e)}
            />
            <Button className="btn-success" onClick={() => handleClick()}>
                +
            </Button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    onAddTodoItem: (newItem) => dispatch(addTodoItem(newItem)),

});

const mergeProps = (mapStateProps, {onAddTodoItem}) => ({
    onAddTodoItem,
});

const NewTodoItem = connect(undefined, mapDispatchToProps, mergeProps)(NewTodoItemComponent);

export default NewTodoItem;
