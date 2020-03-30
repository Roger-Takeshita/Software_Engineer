import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { createNewOrder, removeOrder, updateOrder } from './redux/order';
import { Provider } from 'react-redux';

console.log(store.getState());
store.subscribe(() => console.log(store.getState())); //! subscribe() method will invoke a callback function every time an action is dispatched to the store

store.dispatch(createNewOrder('Reputation', 1)); //! dispatch() metlhod will passs in a new action
store.dispatch(createNewOrder('Red', 1));
// store.dispatch(removeOrder(0));
// store.dispatch(updateOrder(0, { quantity: 20 }));
// store.dispatch(updateOrder(0, { status: 'shipped' }));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
