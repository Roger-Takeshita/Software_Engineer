import { createStore, applyMiddleware } from 'redux';
import rootReducers from './redux/counter';
import createSagaMiddleware from 'redux-saga';
import { watchCountUp } from './sagas/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchCountUp);

export default store;
