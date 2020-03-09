import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { increment, decrement } from './redux/counterRedux';

function App(props) {
    return (
        <div className="App">
            <div>{props.count}</div>
            <button onClick={() => props.dispatch(increment(2))}>+</button>
            <button onClick={() => props.dispatch(decrement(2))}>-</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    count: state.count.count
});

export default connect(mapStateToProps)(App);
