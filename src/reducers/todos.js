import {combineReducers} from 'redux';
import todoChange from './todoChange';

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todoChange(state[action.id], action),
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});

export default todos

const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
    return getAllTodos(state).filter(t => {
        return filter === 'all' ||
            (filter === 'active' && !t.completed) ||
            (filter === 'completed' && t.completed)
    });
};

