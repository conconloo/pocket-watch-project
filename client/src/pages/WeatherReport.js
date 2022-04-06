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
      weather: []
    }
  }

  getPosition =() =>{
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


  componentDidMount(){
    this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude)
    })
    .catch((err) => console.log(err.message));
  }

  render(){
    return(
      <div className='weathercontent'>
        
        <div className='weatherRes'>
          {this.state.weather.map(obj => (
            <>
            <h1>Your Location: {obj.lat}, {obj.lon}</h1>
            <h1>{obj.current.temp}: {Date(obj.current.dt).substring(3,25)}</h1>
            {obj.current.weather.map(conditions =>(
              <>
              <p>{conditions.description}</p>
              <img src = {IconUrlbeg + conditions.icon + IconUrlend} alt="Conditions"/>
              </>
            ))}
            </>
          ))}
        </div>
      </div>
    )
  }
}
/* {obj.alerts ? console.log(obj.alerts) : console.log('empty')} */

export default WeatherReport