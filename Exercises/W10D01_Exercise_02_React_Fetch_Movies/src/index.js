import React from 'react';
import ReactDOM from 'react-dom';                               //! React-Dom - Virtual Dom
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));      //! <App /> XML
serviceWorker.unregister();
