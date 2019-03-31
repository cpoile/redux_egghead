import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import todos from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = () => {
    const middlewares = [thunk];

    // will not work correctly unless you use env transform for browserfy, or
    // environ plugin for webpack
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todos,
        composeWithDevTools(
            applyMiddleware(...middlewares)
        ));
};

export default configureStore