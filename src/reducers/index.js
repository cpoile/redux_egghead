import {combineReducers} from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed'),
});

const todos = combineReducers({
    byId,
    listByFilter,
});

export default todos

export const getVisibleTodos = (state, filter) => {
    // listByFilter is defined in this file, so it's okay to make assumptions
    // about its state shape and access it directly
    // However, the implementation of createList is in a separate file, so we use
    // the getIds selector to get the ids from it.
    const ids = fromList.getIds(state.listByFilter[filter]);
    // the stateShape of byId is encapsulated in ./byId, so let the selector that
    // it exports handle returning the todos by id. This way if that shape changes,
    // we don't have to change this file
    return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
    fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
    fromList.getErrorMessage(state.listByFilter[filter]);