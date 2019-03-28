// both presentation and container component
import {connect} from "react-redux";
import React from "react";
import {addTodoAction} from '../actions'

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                dispatch(addTodoAction(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};
AddTodo = connect()(AddTodo);

export default AddTodo