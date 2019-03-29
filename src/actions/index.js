import {v4} from 'node-uuid';
import * as api from '../api';

// actions
export const addTodoAction = (text) => ({
    type: 'ADD_TODO',
    text: text,
    id: v4()
});

export const toggleTodoAction = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});

// see 16
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );

