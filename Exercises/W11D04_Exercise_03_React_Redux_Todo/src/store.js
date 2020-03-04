import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import todos from './reducers/todos';
import visibilityFilter from './reducers/visibilityFilter';

const reducer = combineReducers({
    todos,
    visibilityFilter
});

export default createStore(reducer, applyMiddleware(logger));
