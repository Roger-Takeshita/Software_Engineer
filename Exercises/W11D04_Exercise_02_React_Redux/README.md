<h1 id='summary'>Summary</h1>

* [Links](#links)
* [Example - Simple Warehouse Inventory - Redux](#example)
  * [Installation](#installation)
  * [Create a New Order](#neworder)
  * [Removing an Order](#removing)
  * [Updating an Order](#updating)
  * [Connecting Redux and React](#connecting)
    * [Import Provider Component to Our Project](#importprovider)
    * [Creating New Orders](#creatingneworders)
    * [Passing State from Redudx as Props](#passingstate)
    * [Passing Dispatch Methods](#passingdispatch)

<h1 id='links'>Links</h1>

[Go Back to Summary](#summary)

* [Updating state without mutating it (immutability)](https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
* [Using Redux with React Router](https://redux.js.org/docs/advanced/UsageWithReactRouter.html)
* [Working with asynchronous actions](https://redux.js.org/docs/advanced/AsyncActions.html)
* [Using `combineReducers`](https://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html)
* [Reducing boilerplate](https://redux.js.org/docs/recipes/ReducingBoilerplate.html)
* [Structuring reducers](https://redux.js.org/docs/recipes/StructuringReducers.html)

<h1 id='example'>Example - Simple Warehouse Inventory - Redux</h1>

<h2 id='installation'>Installation</h2>

[Go Back to Summary](#summary)

* [React Installation](https://redux.js.org/introduction/installation/)

    ```Bash
        npx create-react-app react-redux-exercise
        npm install redux
        npm install react-redux --save
        npm install redux-devtools --save-dev
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

        export default createStore(orderReducer);
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

<h2 id='connecting'>Connecting Redux and React</h2>

[Go Back to Summary](#summary)

* We will need some way of accesing our Redux store from inside our React components. The simplest way to do this could be to pass it around through the props, but one of the key benefits of Redux is to avoid having to pass state as props to deeply neested components.
* Redux give us a React component, called `<Provider />` that we can pass our store to as a prop. The `Provider` component will then use some [magic](https://reactjs.org/docs/context.html) to make our store available to use throughout our component tree.

<h3 id='importprovider'>Import Provider Component to Our Project</h3>

[Go Back to Summary](#summary)

* We can import the `Provider` component from `react-redux` and then pass our `App` component as a child to the `Provider` component.
* In `index.js`:

    ```JavaScript
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './index.css';
        import App from './App';
        import * as serviceWorker from './serviceWorker';
        import store from './store';
        import { Provider } from 'react-redux';

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );

        serviceWorker.unregister();
    ```

<h3 id='creatingneworders'>Creating New Orders</h3>

[Go Back to Summary](#summary)

* As we've been learning React, we've stressed the difference between **presentational** and **container components**. That distinction is especially important when working with Redux: we want to keep our containers and our view components separate. If our application state is complex enough that it warrants using Redux, then we likely have either a lot of state we're trying to manage, state that is in a somewhat complex structure to manage or both. Therefore, the distinction between components that affect state and those that just present it is all the more important.

* **Presentational components** are concerned with the look, container components are concerned with making things work:

    ```JavaScript
        const Users = props => (
        <ul>
            {props.users.map(user => (
                <li>{user}</li>
            ))}
        </ul>
        )
    ```

* **Container component**. It manages and stores its own data, and uses the presentational component to display it.

    ```JavaScript
        class UsersContainer extends React.Component {
            constructor() {
                this.state = {
                    users: []
                }
            }

            componentDidMount() {
                axios.get('/users').then(users =>
                    this.setState({ users: users }))
                )
            }

            render() {
                return <Users users={this.state.users} />
            }
        }
    ```

* The `OrderForm` component is **presential**. We need to build out the corresponding container component using Redux, which we'll do in the `NewOrderForm` component. We're going to build out this container component in the `src/containers/` directory.
* When we want to create a new order using just Redux, we did so with this line of code:

    ```JavaScript
        store.dispatch(createNewOrder('Reputation', 1))
    ```

* We want to do something very similar, this time from within a React component. We need a way of accessing the store's `dispatch()` method, which we can do with the `connect()` method provided by `react-redux`.
  * `connect()` takes a React component and wraps it by returning a new component class connected to Redux. `connect()` takes two arguments (that we will dive in to later) and returns the wrapper for our component. For now, we just need get our wrapper and then pass our component to the wrapper.

    ```JavaScript
        import { connect } from 'react-redux'
        import OrderForm from "../components/OrderForm";

        // const wrapperFunction = connect()
        // const NewOrderForm = wrapperFunction(OrderForm)

        // the above is often shortened to:
        const NewOrderForm = connect()(OrderForm)

        export default NewOrderForm
    ```

* We need to update our `App` component so that it's rendering our `NewOrderForm` component. If we go and look at our React app in the browser, it won't seem as though anything has changed. But calling the wrapper function around our `OrderForm` component does something important: it passes `dispatch()` in to our compnent as a prop. If we add the follwing line to the `render()` function of our `OrderForm` component, we'll see `dipatch()` included in the object that is printed to the console.

    ```JavaScript
        console.log(props)

        // If everything is working, you should see something like this in the console:
        // {dispatch: f}
    ```

* We now have `dispatch()` in the props of our component! That means we can now use it to send actions to the store and update our state!

* The form submission is handled by the `handleSubmit()` method. We need to import the action creator for the action we want to dispatch (`createNewOrder()`). Then, if we add the following line to the `handleSubmit()` method, we will be dispatching our action to the store to update our application's state:

    ```JavaScript
        this.props.dispatch(createNewOrder(productName, quantity));
    ```

<h3 id='passingstate'>Passing State from Redudx as Props</h3>

[Go Back to Summary](#summary)

* Now that we can update our state from within our components, it would be nice to read that state and pass it to our presentational components. Outside of React, we used the `getState()` method to read our state; however, the `connect()` method abstracts this away for us.
* We'll be working on the `OrderTable` component from now on. We want to pass in our state so that we can render a table of all the outstanding orders. Each row will represent a single order. Each row will also include a button for deleting that order, an input for updating the quantity needed for that order, and a dropdown for changing the order status.
* The first argument you can pass in to the `connect()` method is typically called `mapStateToProps`. It's a way of taking the entire state object and returning some subset of it, specifically the part(s) of state that the presentational component will display and nothing more. `mapStateToProps` is a callback that must return an object. A simple version would look something like this:

    ```JavaScript
        const mapStateToProps = state => ({
        orders: state.orders
        })
    ```
* Then if we call `connect()` with our `Orders` component, we can get something like this:

    ```JavaScript
        const OrderTable = connect(mapStateToProps)(Orders)
    ```

    * If we add a `console.log` to our `Orders` component, we'll see the orders property containing each of the orders we've added to our store. We can then output these into a table using the `<Table />` and `<TableRow />` components.

<h3 id='passingdispatch'>Passing Dispatch Methods</h3>

[Go Back to Summary](#summary)

* We could at this point make our state updates using `dispatch()` like we did with our form. But `connect()` takes a second argument: `mapDispatchToProps`. It can be either an object or a function.
* If it is an object, each property must be an action creator and `connect()` will wrap each function into a call to `dispatch()`.
* More often, you'll see `mapDispatchToProps` defined as a function that returns an object. In that case, the `mapDispatchToProps` function receives `dispatch()` as an argument and each property of the returned object should be a function that calls `dispatch()`, passing in some object creator.
* We can use `mapDispatchToProps` to add our remove button to each order table row. If we import the `removeOrder` action creator, we can then create a simple `mapDispatchToProps()` signature that looks like this:

    ```JavaScript
        const mapDispatchToProps = dispatch => ({
        onRemove: id => dispatch(removeOrder(id))
        })
    ```

* Then we update our `connect()` call to look like this:

    ```JavaScript
        const OrderTable = connect(mapStateToProps, mapDispatchToProps)(Orders);
    ```

  * Now we'll have an `onRemove()` method passed into our `Orders` component as a prop and we can use this in the `onClick` handler for our button to remove an order.