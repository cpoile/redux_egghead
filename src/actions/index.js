import {v4} from 'node-uuid'

// actions
export const addTodoAction = (text) => ({
    type: 'ADD_TODO',
    text: text,
    id: v4()
});

export const setVisibilityFilterAction = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodoAction = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

