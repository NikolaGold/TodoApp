import React, {useState} from "react";
import {addTodoItem} from "../../actions";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';


const NewTodoItem = ({onAddTodoItem}) => {
const [newTodoItem, setNewTodoItem] = useState('');
    const clickOnEnter = (event) => {
        if (event.keyCode === 13) {
            onAddTodoItem(newTodoItem);
            setNewTodoItem('');
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <input
                className="form-control"
                type="text" value={newTodoItem}
                onChange={(event) => setNewTodoItem(event.target.value)}
                onKeyDown={(e) => clickOnEnter(e)}
            />
            <Button className="btn-success" onClick={() => {onAddTodoItem(newTodoItem); setNewTodoItem('')}}>
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

export default connect(undefined, mapDispatchToProps, mergeProps)(NewTodoItem);