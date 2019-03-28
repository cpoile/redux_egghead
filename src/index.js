import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from 'react-redux';
import todoApp from './reducers'
import App from './App'
import { loadState, saveState } from './localStorage'

const persistedState = loadState();

const store = createStore(todoApp, persistedState);
console.log(store.getState());

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    });
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
