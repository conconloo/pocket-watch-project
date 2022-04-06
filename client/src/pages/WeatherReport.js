import React from 'react'
import { Component } from "react";

var IconUrlbeg = "http://openweathermap.org/img/wn/"
var IconUrlend = "@2x.png"

class WeatherReport extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    }
  }

  componentDidMount(){
    fetch('api/weather')
      .then(res => res.json())
      .then(weather => {
        this.setState({weather : weather});
      })
  }

  render(){
    return(
      <div className='weathercontent'>
        <h1>College Station, TX</h1>
        <div className='weatherRes'>
          {this.state.weather.map(obj => (
            <>
            <h1>{obj.current.temp}: {Date(obj.current.dt).substring(3,25)}</h1>
            {obj.current.weather.map(conditions =>(
              <>
              <p>{conditions.description}</p>
              <img src = {IconUrlbeg + conditions.icon + IconUrlend} alt="Conditions"/>
              </>
            ))}
            {obj.alerts ? console.log(obj.alerts) : console.log('empty')}
            </>
          ))}
        </div>
      </div>
    )
  }
}

export default WeatherReport