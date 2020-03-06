import { createStore } from 'redux'; //! 1st
import rootReducer from './redux/counter'; //! 2nd

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
