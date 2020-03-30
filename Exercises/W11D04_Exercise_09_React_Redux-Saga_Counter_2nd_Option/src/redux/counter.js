import { combineReducers } from 'redux';

//! Step 1 - Constants
const INCREMENT = 'INCREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT = 'DECREMENT';

//! Step 2 - Actions
export const increment = (number) => {
    console.log('bateu aqui');
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

//! Step 3 - Reducers
const initialState = {
    count: 20
};

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_ASYNC:
            return {
                count: state.count + action.payload
            };
        case DECREMENT:
            return {
                count: state.count - action.payload
            };
        default:
            return state;
    }
};

//+ combineReducers
const rootReducers = combineReducers({
    count: countReducer
});

export default rootReducers;

// export default countReducer;
