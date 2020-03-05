import React from 'react';                                //! import React from 'react'; ---> V6 modules 
                                                            //+ Cannot use on the client side, because you need somehing to compile) 
                                                            //+ Equals to --> const = React = require ('react') COMMON JS
import logo from './logo.svg';
import './App.css';
import Greeter from './Greeter';
import { Fragment } from 'react';

function App(props) {
  let interpolate = 'interpolate';
  return (
    <div className="App">
      <Greeter earthling='string'/>
      <Greeter earthling={interpolate} />
    </div>
  );
}

export default App;
