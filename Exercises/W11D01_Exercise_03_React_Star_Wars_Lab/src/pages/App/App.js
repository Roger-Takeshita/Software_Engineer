import React, { Component } from 'react';
import './App.css';
import { getAllStarships } from '../../services/sw-api';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import StarshipList from '../StarshipList/StarshipList';
import Starship from '../Starship/Starship';


class App extends Component {
  state = {
    data: null
  }

  async componentDidMount() {
      const data = await getAllStarships();
      this.setState({ data: data.results })
  }

  render () {
    if (this.state.data) {
      return (
        <div className="App">
            <header className="App-header">STAR WARS STARSHIPS</header>
            <Switch>
              <Route exact path='/' render={()=>(
                <Link to='/starships/' className={'btn btn-default'}>Starships</Link>
              )}/>
              <Route exact path='/starships' render={(props) =>(
                  <StarshipList {...props} starships={this.state.data}/>
              )}/>
              <Route exact path='/starships/:idx' render={(props) =>(
                  <Starship {...props} starships={this.state.data}/>
              )}/>
              <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
          </div>
        );
    }

    return(
      <div className="App">
        <header className="App-header">STAR WARS STARSHIPS</header>
        <div>loading</div>
      </div>
    );
  }
}


export default App;
