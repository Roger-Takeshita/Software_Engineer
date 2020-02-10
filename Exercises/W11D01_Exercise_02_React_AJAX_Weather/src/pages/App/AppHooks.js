import React, { useState, useEffect } from 'react';
import './App.css';
import Map from '../../components/Map/MapHooks';
import { getCurrentLatLng, getWeatherByLatLng } from '../../services';

//! Hooks
const App = props => {
  // const [lat, setLat] = useState(null) 
  // const [lng, setLng] = useState(null) 
  // const [temp, setTemp] = useState(null) 
  // const [icon, setIcon] = useState(null) 

  const [{lat, lng, temp, icon}, setState] = useState({
    lat: null,
    lng: null,
    icon: '',
    temp: null
  });

  // console.log(lat);
  // console.log(lng);
  // console.log(temp);
  // console.log(icon);

  useEffect(() => {
    async function fetchData() {
      console.log('useEffect');
      const { lat, lng } = await getCurrentLatLng();    //!Destructuring the promise into 2 variables
      const data = await getWeatherByLatLng(lat, lng);
      // setLat(lat)
      // setLng(lng)
      // setTemp(Map.round(data.main.temp))
      // setIcon(data.weather[0].icon)
      setState({
        lat,
        lng,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon
      });
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <Map lat={lat} lng={lng}/>
      <header className='App-header'>
        <div>{temp}&deg;</div>
        REACT WEATHER
        <img src={`https://openweathermap.org/img/w/${icon}.png`} alt='Current Conditions'/>
      </header>
    </div>
  );
}

//! Class components
/* class App extends Component {
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

} */

export default App;
