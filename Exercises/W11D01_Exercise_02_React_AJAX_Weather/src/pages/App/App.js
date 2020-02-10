import React, { Component } from 'react';
import './App.css';
import Map from '../../components/Map/Map';
import { getCurrentLatLng, getWeatherByLatLng } from '../../services';

class App extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
    icon: ''
  }

  async componentDidMount() {
    const { lat, lng } = await getCurrentLatLng(); //!Destructuring the promise into 2 variables
    const data = await getWeatherByLatLng(lat, lng);
    console.log(data);
    console.log(lat, lng);
    this.setState({ lat, lng, temp: Math.round(data.main.temp), icon: data.weather[0].icon });
  }

  render() {
    return (
      <div className='App'>
        <Map lat={this.state.lat} lng={this.state.lng}/>
        <header className='App-header'>
          <div>{this.state.temp}&deg;</div>
          REACT WEATHER
          <img src={`https://openweathermap.org/img/w/${this.state.icon}.png`} alt='Current Conditions'/>
        </header>
      </div>
    );
  }

}

export default App;
