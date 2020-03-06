import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/counter';
import AnotherComponent from './components/AnotherComponent';

function App() {
    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    return (
        <div className="App">
            <h1>Counter {counter}</h1>
            <button onClick={() => dispatch(increment(5))}>+</button>
            <button onClick={() => dispatch(decrement(5))}>-</button>
            <AnotherComponent />
            {isLogged ? (
                <h3>Valuable Information That Only Logged Users Should see</h3>
            ) : (
                ''
            )}
        </div>
    );
}

export default App;
