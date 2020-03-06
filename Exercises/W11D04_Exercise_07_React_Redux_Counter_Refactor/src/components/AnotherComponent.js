import React from 'react';
import { connect } from 'react-redux';

function AnotherComponent(props) {
    return (
        <div>
            <h1>AnotherComponent</h1>
            <button onClick={() => props.dispatch({ type: 'SIGN_IN' })}>
                User is: {props.isLogged ? 'logged' : 'not logged'}
            </button>
        </div>
    );
}

const mapStateToPros = (state) => ({
    isLogged: state.isLogged
});

export default connect(mapStateToPros)(AnotherComponent);
