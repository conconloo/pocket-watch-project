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
      location: "",
      weather: [],
      alerts: []
    }
  }


  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getCityName = async (latitude, longitude) => {
    fetch('api/currweather?lat=' + latitude + '&lon=' + longitude)
      .then(res => res.json())
      .then(weather => {
        this.setState({location: weather[0].city.name});
      })
      
  }

  getWeather = async (latitude, longitude) => {
    fetch('api/weather?lat='+ latitude + '&lon=' + longitude)
      .then(res => res.json())
      .then(weather => {
        this.setState({weather: weather});
        console.log(this.state);
      });
  }

  getAlerts = async(latitude, longitude) => {
    fetch('api/weather?lat=' + latitude + '&lon=' + longitude)
      .then(res => res.json())
      .then(alert => {
        this.setState({alerts: alert});
      })
  }

  componentDidMount(){
    this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
      this.getCityName(position.coords.latitude, position.coords.longitude);
    })
    .catch((err) => console.log(err.message));
  }

  render(){
    return(
      <div className='weatherRes'>
        {this.state.weather.map(obj => (
          <>
          {console.log(obj)}
          <div className='weatherToday'>
            <h1>Weather today in {this.state.location}</h1>
          </div>
          <div className='conditions'>
          {obj.current.weather.map(conditions =>(
            <>
            <div className='conditions1'>
              <div className='dateTime'>
                <p>{new Date(obj.current.dt * 1000).toLocaleDateString()}</p>
                <p>{new Date(obj.current.dt * 1000).toLocaleTimeString("en-US")}</p>
              </div>
              <img src = {IconUrlbeg + conditions.icon + IconUrlend} alt="Conditions"/>
              <div className='conditions2'>
                <h2>{Math.round(obj.current.temp)}&#176;</h2>
                <p>{conditions.description}</p>
              </div>
            </div>
            </>
          ))}
          {obj.daily.map(forecast => (
            <>
            {console.log(forecast.description)}
            <div className='conditions1'>
              <div className='dateTime'>
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>{new Date(forecast.dt * 1000).toLocaleTimeString("en-US")}</p>
              </div>
              <img src = {IconUrlbeg + forecast.weather[0].icon + IconUrlend} alt="Conditions"/>
              <div className='conditions2'>
                <h2>{Math.round(forecast.temp.max)}&#176;</h2>
                <p>{forecast.weather[0].description}</p>
              </div>
            </div>
            </>
          ))
            
          }
          </div>
          <div className='weatherToday'>
            <h1>Alerts</h1>
          </div>
          <div className='alerts'>
            {obj.alerts ? obj.alerts.map(alert => (
              <>
              <h1>{alert.sender_name ? 'From the ' + alert.sender_name + ' association: ': ''}</h1>
              <p>{alert.description ? alert.description : ''}</p>
              </>
            )) : "No alerts at this time."}
          </div>
          </>
        ))}
      </div>
    )
  }
}
/* {obj.alerts ? console.log(obj.alerts) : console.log('empty')} */

export default WeatherReport