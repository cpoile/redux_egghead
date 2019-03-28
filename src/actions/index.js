let nextTodoId = 0;

// actions
export const addTodoAction = (text) => ({
    type: 'ADD_TODO',
    text: text,
    id: nextTodoId++
});

export const setVisibilityFilterAction = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodoAction = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

