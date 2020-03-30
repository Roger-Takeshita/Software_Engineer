import { createStore, applyMiddleware } from 'redux';
import orderReducer from './redux/order';
import logger from 'redux-logger';

export default createStore(orderReducer, applyMiddleware(logger));
