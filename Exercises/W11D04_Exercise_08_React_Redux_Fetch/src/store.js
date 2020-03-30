import { createStore } from 'redux';
import rootReducer from './redux/students';

const store = createStore(rootReducer);

export default store;
