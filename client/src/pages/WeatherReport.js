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

  /*

  getCity = async(latitude, longitude) => {
    var key = '207a527a4d31d2de8a7264f13e8ad6a2';
    fetch('https://api.openweathermap.org/geo/1.0/reverse?lat=' + latitude + '&lon=' + longitude + '&limit=' + '1' + '&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      this.drawCity(data);
    })
  }

  cityWeather = async(latitude, longitude) => {
    var key = '207a527a4d31d2de8a7264f13e8ad6a2';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      this.drawWeather(data);
    })
    .catch(function() {

    });
  }

  drawWeather = (d) => {
    var celsius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8) + 32);
    var description = d.weather[0].description;

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
  }

  drawCity = (d) => {
    var city = d[0].name;
    var country = d[0].country;

    document.getElementById('city').innerHTML = city;
    document.getElementById('country').innerHTML = country;
  }

  */

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
          {obj.alerts.map(alert => (
            <>
            <h1>{alert.sender_name ? 'From the ' + alert.sender_name + ' association: ': ''}</h1>
            <p>{alert.description ? alert.description : ''}</p>
            </>
          ))}
          
          </>
        ))}
      </div>
    )
  }
}
/* {obj.alerts ? console.log(obj.alerts) : console.log('empty')} */

export default WeatherReport