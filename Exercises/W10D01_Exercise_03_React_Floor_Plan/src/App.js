import React, { Component } from 'react';
import './App.css';
import Bath  from './components/Bath/Bath';
import Bedroom  from './components/Bedroom/Bedroom';
import Kitchen  from './components/Kitchen/Kitchen';
import LivingRoom from './components/LivingRoom/LivingRoom';

class App extends Component {
  render() {
    return(
      <div className="App">
        <div className="bedroom" id="bedroom-1">
          <Bedroom description={1}/>
        </div>
        <Kitchen />
        <div className="bath" id="bath-1">
          <Bath description={'Full'}/>
        </div>
        <div className="bedroom" id="bedroom-2">
          <Bedroom description={2}/>
        </div>
          <LivingRoom />
        <div className="bath" id="bath-2">
          <Bath description={'Half'}/>
        </div>
        <div className="bedroom" id="bedroom-3">
          <Bedroom description={3}/>
        </div>
      </div>
    )
  }
}

export default App;
