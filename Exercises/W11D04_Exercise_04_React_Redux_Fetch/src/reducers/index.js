//! Combine all our reducers in here
import { combineReducers } from 'redux';
import postReducer from './postReducer';

export default combineReducers({
    posts: postReducer //! named my postReducers ans posts, later we'll create an object and pass the reducers
});
