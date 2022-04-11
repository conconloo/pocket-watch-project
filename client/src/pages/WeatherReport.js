import { alertClasses } from '@mui/material';
import React from 'react'
import { Component } from "react";

var IconUrlbeg = "http://openweathermap.org/img/wn/"
var IconUrlend = "@2x.png"

class WeatherReport extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      weather: [],
      alerts: []
    }
  }

  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getWeather = async (latitude, longitude) => {
    fetch('api/weather?lat='+ latitude + '&lon=' + longitude)
      .then(res => res.json())
      .then(weather => {
        this.setState({weather: weather});
      });
  }

  getAlerts = async(latitude, longitude) => {
    fetch('api/weather?lat=' + latitude + '&lon=' + longitude + '&exclude=current,minutely,hourly,daily')
      .then(res => res.json())
      .then(alerts => {
        this.setState({alerts: alerts});
      })
  }

  componentDidMount(){
    this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude)
    })
    .catch((err) => console.log(err.message));
  }

  render(){
    return(
      <div className='weatherRes'>
        {this.state.weather.map(obj => (
          <>
          <h1>Weather today in:</h1>
          <p>{obj.lat}, {obj.lon}</p>
          <p>{Date(obj.current.dt).substring(3,25)}</p>
          <div className='conditions'>
          {obj.current.weather.map(conditions =>(
            <>
            <div className='conditions1'>
              <img src = {IconUrlbeg + conditions.icon + IconUrlend} alt="Conditions"/>
              <h2>{Math.round(obj.current.temp)}&#176;</h2>
            </div>
            <div className='conditions2'>
              <p>{conditions.description}</p>
            </div>
            </>
          ))}
          </div>
          <h1>Alerts:</h1> 
          {obj.alerts ? obj.alerts.map(alert => (
            <>
            <h1>{alert.sender_name ? 'From the ' + alert.sender_name + ' association: ': ''}</h1>
            <p>{alert.description ? alert.description : ''}</p>
            </>
          )) : "No Alerts"}
          </>
        ))}
      </div>
    )
  }
}
/* {obj.alerts ? console.log(obj.alerts) : console.log('empty')} */

export default WeatherReport