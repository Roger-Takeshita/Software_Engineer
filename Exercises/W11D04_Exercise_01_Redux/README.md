# [Installation](https://redux.js.org/introduction/installation/)

    ```Bash
        npx create-react-app react-redux-exercise
        npm install redux
        npm install react-redux
        npm install --save-dev redux-devtools
    ```

* inside the `src` folder

    ```Bash
        mkdir actions constants reducers
        touch actions/order.js constants/order.js reducers/order.js store.js
    ```

* In the end we'll have a structure like this:

    ```Bash
        .
        ├── node_modules
        ├── public
        └── src
            ├── actions
            │   └── order.js
            ├── constants
            │   └── order.js
            ├── reducers
            │   └── order.js
            ├── App.js
            ├── App.test.js
            ├── index.css
            ├── index.js
            ├── logo.svg
            ├── serviceWorker.js
            ├── setupTests.js
            └── store.js
    ```

* The `actions` directory is where we'll build out our action creators - functions that **returns an object literal representing a redux action**.
* The `reducers` directory is where we'll build out our reducers - functions that take our current state and an action and **returns a new updated state object**
* The `constants` directory is where we'll **define constant variables representing our action types**.
  * We're grouping related functionality by filename `order.js`. Splitting functionality in this way is common but comes with a lot of overhead
* Finally, we create a `store.js` file where we'll import Redux and create our **store**

<h2 id='neworder'>Create a New Order</h2>

[Go Back to Summary](#summary)

* **Step 1** create a new constant to represent this action
  
  * in `constants/order.js`

    ```JavaScript
        export const CREATE_ORDER = 'CREATE_ORDER';
    ```

* **Step 2** create a new action creator

  * in `actions/order.js`

    ```JavaScript
        import { CREATE_ORDER } from "../constants/order"

        export function createNewOrder(productName, quantity) {
            return {
                type: CREATE_ORDER,
                data: {
                    productName,
                    quantity,
                    status: 'pending'
                }
            }
        }
    ```
  * Our action creator is just a JavaScript function that returns a plain JavaScript Object. If we're creating an order for the new Taylor Swift album on vinly and we want 3 copies, we would involke this action creator like this:

    ```JavaScript
        const order = {
            type: 'CREATE_ORDER',
            data: {
                productName: 'Reputation (Vinyl)',
                quantity: 3,
                status: 'pending'
            }
        }
    ```

  * Our actions are just plain JavaScript object. The only required property is that `type` property, which is how we'll know how to update state in our reducer. Otherwise, the object can take any shape. As you might imagine, not standardizing the shape can lead to confusions and erros, so here we're following a common standard for actions called the [Flux Standar Action](https://github.com/acdlite/flux-standard-action)

* **Step 3** build out our reducer

  * in `reducers/order.js`:

    ```JavaScript
        import { CREATE_ORDER } from '../constants/order';

        const DEFAULT_STATE = {
            orders: []
        }

        export default function orderReducer (state = DEFAULT_STATE, action) {
            switch (action.type) {
                case CREATE_ORDER:
                    return {
                        ...state,
                        orders: [...state.orders, action.data]
                    };
                default:
                    return state;
            }
        }
    ```
  * It's a good idea to provide your reducer with some default state. This will help you to think about the structure of your state as well as ensure your're always returngin useful state from your reducer.
  * Your reducer needs to check the `type` property of the `action` object and then perform some update to state based on the valeu of `type`. You can do this with simple `switch`  

* **Step 4** the final step before we have our state managed by Redux is to create our `store` (where all our state will be stored)
  
  * in `store.js`

    ```Bash
        import { createStore } from 'redux';
        import orderReducer from './reducers/order';

        export default createStore(
            orderReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    ```

  * We import the `createStore` function from `redux` and our `orderReducer` then invoke the `createStore` function, passing in our reducer function. This is a way to pass in more than one reducer.


* **Step 5** Our store is all set up an ready to manage state for our application. For now, we'll just `console.log` state updates from `index.js`

  * in `index.js`

    ```JavaScript
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './index.css';
        import App from './App';
        import * as serviceWorker from './serviceWorker';
        import store from './store';
        import { createNewOrder } from './actions/order';

        console.log(store.getState());
        store.dispatch(createNewOrder('Reputation', 1))
        console.log(store.getState());
        store.dispatch(createNewOrder('Red', 1))
        console.log(store.getState())

        ReactDOM.render(<App />, document.getElementById('root'));

        serviceWorker.unregister();
    ```

  * In `index.js` we need to import our `store` as well as the `action` we would like to dispatch. The `store` object has a couple of methods you'll see often, including `getState()`, `dispatch()` and `subscribe()`.
  * In the code above, we're first logging the initial state to the console. We're then dispatching a new order action using the `dispatch` function and pasing in the action `object` returned by our `createNewOrder` action creator. `dispatch()` takes an `action` and passes it to our reducer along with the current state.
  * We can refactor the snippet above to use the `subscribe()` method, which will invoke a callback function every time an action is dispatched to the store.

    ```JavaScript
        import srote from './store';
        import { createNewOrder } from './actions/order';

        console.log(store.getState());
        store.subscribe(() => console.log(store.getState()))
        
        store.dispatch(createNewOrder('Reputation', 1))
        store.dispatch(createNewOrder('Red', 1))
    ```

  * The callback we're passing in to `subscribe()` is getting the current state and logging it.
  * **Aside: The Process of Working with Redux**

  * The processes we followed for creating our new order is a good workflow to follow generally when working with Redux. Start by defining a new constant, then create your new action creator, then define or update your reducer and you're ready to dispatch changes to the store.

  * All together, that means there are three steps to follow:
    1. Create a new constant in your constants/ directory
    2. Create a new action creator in actions/
    3. Update your reducer

  * The first three steps you'll almost always follow, in order whenever you need to update Redux.

<h2 id='removing'>Removing an Order</h2>

[Go Back to Summary](#summary)

* **Step 1** Define a new constant in `constants/order.js`
  
    ```JavaScript
        export const CREATE_ORDER = 'CREATE_ORDER';
        export const REMOVE_ORDER = 'REMOVE_ORDER';
    ```

* **Step 2** Define a new action creator in `actions/order.js`:

    ```JavaScript
        import { CREATE_ORDER, REMOVE_ORDER } from "../constants/order"

        export function createNewOrder(productName, quantity) {
            return {
                type: CREATE_ORDER,
                data: {
                    productName,
                    quantity,
                    status: 'pending'
                }
            }
        }

        export const removeOrder = (id) => (
            {
                type: REMOVE_ORDER,
                data: id
            }
        )
    ```

* **Step 3** Add a `case` statement to your reducer for fremoving an order

    ```JavaScript
        import { CREATE_ORDER, REMOVE_ORDER } from '../constants/order';

        const DEFAULT_STATE = {
            orders: []
        }

        export default function orderReducer (state = DEFAULT_STATE, action) {
            switch (action.type) {
                case CREATE_ORDER:
                    return {
                        ...state,
                        orders: [...state.orders, action.data]
                    };
                case REMOVE_ORDER:
                    return {
                        ...state,
                        orders: state.orders.filter((order, idx) => {
                            return idx !== order.data
                        })
                    }
                default:
                    return state;
            }
        }
    ```

* **Step 4** Now we can use our action in `index.js`
  
    ```JavaScript
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './index.css';
        import App from './App';
        import * as serviceWorker from './serviceWorker';
        import store from './store';
        import { createNewOrder, removeOrder } from './actions/order';

        console.log(store.getState());
        store.subscribe(() => console.log(store.getState()))

        store.dispatch(createNewOrder('Reputation', 1))
        store.dispatch(createNewOrder('Red', 1))
        store.dispatch(removeOrder(0))

        ReactDOM.render(<App />, document.getElementById('root'));

        serviceWorker.unregister();
    ```

<h2 id='updating'>Updating an Order</h2>

[Go Back to Summary](#summary)

* **Step 1** Define a new constant in `constants/order.js`
  
    ```JavaScript
        export const CREATE_ORDER = 'CREATE_ORDER';
        export const REMOVE_ORDER = 'REMOVE_ORDER';
        export const UPDATE_ORDER = 'UPDATE_ORDER';
    ```

* **Step 2** Define a new action creator in `actions/order.js`:

    ```JavaScript
        import { CREATE_ORDER, REMOVE_ORDER, UPDATE_ORDER } from "../constants/order"

        export function createNewOrder(productName, quantity) {
            return {
                type: CREATE_ORDER,
                data: {
                    productName,
                    quantity,
                    status: 'pending'
                }
            }
        }

        export const removeOrder = (id) => (
            {
                type: REMOVE_ORDER,
                data: id
            }
        )

        export const updateOrder = (id, updatedOrder) => ({
            type: UPDATE_ORDER,
            data: {
                id,
                updatedOrder
            }
        });
    ```

* **Step 3** Add a `case` statement to your reducer for fremoving an order

    ```JavaScript
        import { CREATE_ORDER, REMOVE_ORDER, UPDATE_ORDER } from '../constants/order';

        const DEFAULT_STATE = {
            orders: []
        };

        export default function orderReducer(state = DEFAULT_STATE, action) {
            switch (action.type) {
                case CREATE_ORDER:
                    return {
                        ...state,
                        orders: [...state.orders, action.data]
                    };
                case REMOVE_ORDER:
                    return {
                        ...state,
                        orders: state.orders.filter((order, idx) => {
                            return idx !== action.data;
                        })
                    };
                case UPDATE_ORDER:
                    return {
                        ...state,
                        orders: state.orders.map((order, idx) => {
                            if (idx !== action.data.id) return order;

                            return {
                                ...order,
                                ...action.data.updatedOrder
                            };
                        })
                    };
                default:
                    return state;
            }
        }
    ```

* **Step 4** Now we can use our action in `index.js`
  
    ```JavaScript
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
    ```