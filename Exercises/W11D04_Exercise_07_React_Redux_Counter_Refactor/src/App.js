import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AnotherComponent from './components/AnotherComponent';

function App(props) {
    return (
        <div className="App">
            <h1>Counter {props.counter}</h1>
            <button
                onClick={() =>
                    props.dispatch({ type: 'INCREMENT', payload: 5 })
                }
            >
                +
            </button>
            <button
                onClick={() =>
                    props.dispatch({ type: 'DECREMENT', payload: 5 })
                }
            >
                -
            </button>
            <AnotherComponent />
            {props.isLogged ? (
                <h3>Valuable Information That Only Logged Users Should see</h3>
            ) : (
                ''
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    counter: state.counter,
    isLogged: state.isLogged
});

export default connect(mapStateToProps)(App);
