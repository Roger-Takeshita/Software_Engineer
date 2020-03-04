import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { createNewOrder, removeOrder, updateOrder } from './actions/order';

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

store.dispatch(createNewOrder('Reputation', 1));
store.dispatch(createNewOrder('Red', 1));
store.dispatch(removeOrder(0));
store.dispatch(updateOrder(0, { quantity: 20 }));
store.dispatch(updateOrder(0, { status: 'shipped' }));

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
