import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import todos from './reducers';

const configureStore = () => {
    const middlewares = [thunk];

    // will not work correctly unless you use env transform for browserfy, or
    // environ plugin for webpack
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todos,
        applyMiddleware(...middlewares)
    );
};

export default configureStore