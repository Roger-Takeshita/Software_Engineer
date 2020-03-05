<h1 id='summary'></h1>

* [Redux](#redux)
  * [What is Redux?](#whatis)
  * [Functional Programming and the React Ecosystem](#functionalprogramming)
  * [Concepts of Redux](#concepts)
    * [Application State & Immutability in Redux](#applicationstate)
    * [Techniques for Avoiding the Mutations of State](#techniques)
      * [Splice vs Slice](#splicevsslice)
  * [Elements of Redux](#elements)
    * [The Store](#thestore)
    * [Actions](#actions)
    * [Reducers](#reducers)
    * [A Model of the Store](#model)
  * [Example 1 - Simple Warehouse Inventory - Redux](#explample1)
    * [Create a New Order](#neworder)
    * [Removing an Order](#removing)
    * [Updating an Order](#updating)

<h1 id='redux'>Redux</h1>

<h2 id='whatis'>What is Redux?</h2>

[Go Back to Summary](#summary)

* Redux is a state management library. It solves the problme of having a bunch of localized components states by funneling them into a central hub. this really begins to become an isse for developers as applications scales, increasing in complexity and size.
* There are 3 fundamentals principles of Redux:
  1. Single source of truth
     * The state of your whole application is stored in an object within a single store
  2. Sate is read only
     * The only way to change the state is to emit an action, an object describing what happened
  3. changes are made with pure functions
     * To specify how the state tree is transformed by actions, you write pure reducers

<h2 id='functionalprogramming'>Functional Programming and the React Ecosystem</h2>

[Go Back to Summary](#summary)

* The concept of a pure function: given any input, a **pure function** will return the exact same output. It will also **have no side effects**
  * No side effecs means that the function doesn't modify anything outside its own scope.
  * This means that the **pure function** is only concerned with returning some output that is a function of its input.

* inpure functions
  * `Math.random()`
  * `new Date().getTime()`
  * `$.ajax()`
  * `[].push()`
  
* Pure functions include:
  * `[].map()`
  * `[].reduce()`
  * `Object.assign()`
  
* Part of the power of React is this very idea applied to view. We pass in props a component, and we et the same predictable componenet every time.
* In short, applying concepts of functional programming to a fron-end library insures **a hight degree of predictability**. It also creates a modular architecture that allows a library like Redux to intervene in how React manages state.
* Redux will use fucntional programming's approach to function compositions: reusing certain functions in the construction of other functions.

<h2 id='concepts'>Concepts of Redux</h2>

<h3 id='applicationstate'>Application State & Immutability in Redux</h3>

[Go Back to Summary](#summary)

Simply put, state in a representation of your application'data. Redux manages your application's state, encapsulating the data stored in your variable, in something called **The Store**. When using Redux, we want to treat application state in such a way that it is always **copied** and never directly mutated. The end result of this approach is that we get a history of the application's states over the course of its usage. This affords a great resource for developers debugging a complex user-interface, for example. A developer using Redux in this way could see exact series of user actions that produces the bug.

<h3 id='techniques'>Techniques for Avoiding the Mutations of State</h3>

[Go Back to Summary](#summary)

* ES6 has a couple nice features that makes dealing with immutable data easier. `Object.assign()` and spread operators `...`
* `Object.assign()` in particular give us a powerful way of copying objects.

    ```JavaScript
        let cat = {
            name: 'Meowy Mandel',
            meowy: true
        }

        let copiedCat = Object.assign({}, cat)
    ```

* Note: this only works for shallow copies. It doesn't do a proper deep copy (properties more than 1 level nested are still referenced to the old object).

    ```JavaScript
        let cat = {
        name: "Meowy Mandel",
        meowy: true,
        friends: {
            sparkles: true,
            rufus: false
        }
        }

        let newCat = Object.assign({}, cat)

        newCat.friends.sparkles = false;
        cat.meowy = false;

        console.log(cat);
        console.log(newCat);
    ```

* `...` or the spread operator give us a nice way of combining arrays. It exposes or "unwraps" the values in an array.

    ```JavaScript
        let fruits = ['tomato', 'cucumber', 'pumpkin'];
        let upatedFruits = [...fruits, 'avocado'];

        console.log(updateFruits)
    ```

* The above code is equivalent to this:

    ```JavaScript
        let fruits = ['tomato', 'cucumber', 'pumpkin'];
        let updatedFuits = fuits.concat('Avocado')
    ```

* For arrays of primitives, we hae the good, old reliable `.slice()` for copying array. ad spread operators for combining arrays of parts of arrays.

    ```JavaScript
        let todos = [
            {todo: "learn to thrash"},
            {todo: "learn redux"},
            {todo: "hang tight"},
            {todo: "stay loose"}
        ]
        let todosCopy = todos.map(obj => Object.assign({}, obj))
    ```

<h4 id='splicevsslice'>Splice vs Slice</h4>

* `.splice()` **is a mutator method**, meaning it modifies whatever it is called on

    ```JavaScript
        const months = ['Jan', 'March', 'April', 'June'];
        months.splice(1, 0, 'Feb');
        // inserts at index 1
        console.log(months);
        // expected output: Array ["Jan", "Feb", "March", "April", "June"]

        months.splice(4, 1, 'May');
        // replaces 1 element at index 4
        console.log(months);
        // expected output: Array ["Jan", "Feb", "March", "April", "May"]
    ```

* `.slice()` **ist not a mutator method**. Use it for **copying** all of part of an array.

    ```JavaScript
        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        console.log(animals.slice(2));
        // expected output: Array ["camel", "duck", "elephant"]

        console.log(animals.slice(2, 4));
        // expected output: Array ["camel", "duck"]

        console.log(animals.slice(1, 5));
        // expected output: Array ["bison", "camel", "duck", "elephant"]
    ```
  * `Slice` does not alter the original array. It returns a shallow copy of elements from the original array.


<h2 id='elements'>Elements of Redux</h2>

<h3 id='thestore'>The Store</h3>

[Go Back to Summary](#summary)

* The store is a kind of a hub that all information (**application state**) in a program flows through. **The store** encapsulates not only the data in the program, but also controls the flow of the program data, storing each change in a separate state. Redux even give us the ability to time travel through the application's history of application states. It's like the principles of git applied to application-state rather than file-state.
* All the principles of Redux are embodied in the store. The store holds an application's **state** (including current and previous states), actions which specify different changes to make on some part of the application state, and **the reducer** which specifies which action update the state object.
* Since the state is bein represented as an immutable data-structure, we cannot modify it. Changing state in the program requires dispatching an action that modifies a copy of the state. This becomes the next state of the program, spat out by the reducer.
* Every time an action has been dispatched via the reducer, we want to update the UI. So we subscribe the rener method to any changes taking places to the application's state object.

<h3 id='actions'>Actions</h3>

[Go Back to Summary](#summary)

* An action is a garden-variety JavaScript object that describes what kind of change is to take place, specifying what change to make to what data.
* The minium requirement for an action is that the action must have a type property that **is not** `undefined`.
  * Unless you are using middleware, the value `type` be a string in order for Redux's time travel features to function.
  * Strings are prefered for values of the `type` property of an action since they can be `serialized`. String instances are simple, modular data that are stored in memory and recalled from the memory in a straight-forward manner, this is not necesessarily the case with more complex data types like objects, especially ones involving references.

    ```JavaScript
        function incrementScore(index) {
            return {
                type: 'INCREMENT_SCORE',
                index: index
            }
        }
    ```

<h3 id='reducers'>Reducers</h3>

[Go Back to Summary](#summary)

* The reducer specifies how actions update the state of the application, generating the next application-state.

<h3 id='model'>A Model of the Store</h3>

[Go Back to Summary](#summary)

```JavaScript
    class Store {
        constructor() {
            this.subscriptions = []
            this.state = null
        }

        getState() {
            return this.state
        }

        // The ONE FUNCTION that handles any and all updates to our application-state
        reducer(action, state) {
            switch (action.type) {
                case 'ADD_TODO':
                    return {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }
                case 'TOGGLE_TODO_COMPLETED':
                    return {
                        ...state,
                        completed: !state.completed
                    }
                default:
                    return state
            }
        }

        //Called any time the reducer applies an action to a state
        subscribe(subscription) {
            this.subscriptions.push(subscription)
        }
    }
```

* Additional Store Methods
  * `store.getState()`
    * Get back current state of your application
  * `store.dispatch({ type: 'ACTION_TYPE'})`
    * Perform a certain action which changes state
  * `store.subscribe(this.render)`
    * Called when an action is dispatched

<h2 id='explample1'>Example 1 - Simple Warehouse Inventory - Redux</h2>

[Go Back to Summary](#summary)

* [Installation](https://redux.js.org/introduction/installation/)

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

<h3 id='neworder'>Create a New Order</h3>

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

<h3 id='removing'>Removing an Order</h3>

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

<h3 id='updating'>Updating an Order</h3>

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