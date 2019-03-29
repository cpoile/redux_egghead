import todoApp from './reducers';
import {createStore} from 'redux';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: grey', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

// now we can dispatch actions, and promises that resolve to actions
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    };
};

const configureStore = () => {
    const store = createStore(todoApp);

    // will not work correctly unless you use env transform for browserfy, or
    // environ plugin for webpack
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    console.log(store.getState());

    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
};

export default configureStore