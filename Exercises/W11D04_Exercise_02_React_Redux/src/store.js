import { createStore } from 'redux';
import orderReducer from './reducers/order';

export default createStore(orderReducer);
