import { createStore, applyMiddleware } from 'redux';
import rootReducers from './redux/counterRedux';
import createSagaMiddleware from 'redux-saga';
import { watchCounterUp } from './redux/counterReduxSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchCounterUp);

export default store;
