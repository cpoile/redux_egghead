const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todoChange(state, action)];
        case 'TOGGLE_TODO':
            return state.map(t => todoChange(t, action));
        default:
            return state;
    }
};

const todoChange = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                text: action.text,
                id: action.id,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (action.id === state.id) {
                return {
                    ...state,
                    completed: !state.completed
                };
            } else return state;
        default:
            return state;
    }
};

export default todos