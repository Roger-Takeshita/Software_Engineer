import { combineReducers } from 'redux';

//! Step 1 - Constants
const UPDATE_STUDENTS = 'UPDATE_STUDENTS';

//! Step 2 - Actions
export const updateStudents = (students) => {
    return {
        type: UPDATE_STUDENTS,
        payload: students
    };
};

//! Step 3 - Reducers
const updateStudentsReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_STUDENTS:
            return [...state, ...action.payload];
        default:
            return state;
    }
};

//+ Combine reducers (if you have more than one reducer)
const rootReducer = combineReducers({
    students: updateStudentsReducer
});

export default rootReducer;
