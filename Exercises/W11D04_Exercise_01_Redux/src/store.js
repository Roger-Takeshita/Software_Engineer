import { createStore } from 'redux';
import orderReducer from './reducers/order';

export default createStore(
    orderReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
