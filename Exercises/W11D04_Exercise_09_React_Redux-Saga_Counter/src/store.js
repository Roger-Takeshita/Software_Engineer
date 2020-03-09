import { createStore, applyMiddleware } from 'redux';
import rootReducers from './redux/counterRedux';
import createSagaMiddleware from 'redux-saga';
import { watchCounterUp } from './redux/counterReduxSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchCounterUp);

export default store;
