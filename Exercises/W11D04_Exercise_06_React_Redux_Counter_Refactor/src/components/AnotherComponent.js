import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLogged } from '../redux/counter';

function AnotherComponent(props) {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>AnotherComponent</h1>
            <button onClick={() => dispatch(toggleLogged())}>
                User is: {isLogged ? 'logged' : 'not logged'}
            </button>
        </div>
    );
}

export default AnotherComponent;
