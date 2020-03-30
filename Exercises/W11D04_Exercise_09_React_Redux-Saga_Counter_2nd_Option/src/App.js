import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { increment, decrement } from './redux/counter';

function App(props) {
    return (
        <div className="App">
            <div className="Age-label">
                your age: <span>{props.count}</span>
            </div>
            <button onClick={props.onIncrement}>+</button>
            <button onClick={props.onDecrement}>-</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    count: state.count.count
});

const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch(increment(2)),
    onDecrement: () => dispatch(decrement(2))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
