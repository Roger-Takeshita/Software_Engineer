import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'; //! 1st
import rootReducer from './reducers/'; //! 2nd
import { Provider } from 'react-redux'; //! 3rd - connect react to store

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* //! Step 1 - Constants
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//! Step 2 - Action - Increment / Decrement - Simple function that returns an object
//+ Define functions that returns an object literal representing a redux action
//- Minimun requirements: type: 'STRING' (Because string can be serialized)
const increment = () => {
    return {
        type: 'INCREMENT'
    };
};
const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};

//! Step 3 - Reducer
//+ Reducer will take care of all of our actions
const counter = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
    }
};

//! Step 4 - Store - Globalized State
let store = createStore(counter);

//! Display it in the console
store.subscribe(() => {
    console.log(store.getState());
});

//! Dispatch - Execute the action
store.dispatch(increment()); */

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
