import { combineReducers } from 'redux';

//! Step 1 - Constants
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SIGN_IN = 'SIGN_IN';

//! Step 2 - Actions
export const increment = (number) => {
    return {
        type: INCREMENT,
        payload: number
    };
};

export const decrement = (number) => {
    return {
        type: DECREMENT,
        payload: number
    };
};

export const toggleLogged = () => {
    return {
        type: SIGN_IN
    };
};

//! Setp 3 - Reducers
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + action.payload;
        case DECREMENT:
            return state - action.payload;
        default:
            return state;
    }
};

const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case SIGN_IN:
            return !state;
        default:
            return state;
    }
};

//+ combineReducers
const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
});

export default rootReducer;
