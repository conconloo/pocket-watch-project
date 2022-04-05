import React from 'react'
import { Component } from "react";

class WeatherReport extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    fetch('api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({users : users});
      })
  }

  render(){
    return(
      <div className='weathercontent'>
      <div className='weather'>
        <h2>Detailed Weather Report</h2>
        <p>(IMG: geolocation pin) in [insert location]</p>
        <h2>Temperature</h2>
      </div>
      <div className='weather_alert'>
        <h2>Severe Weather Alerts</h2>
        <p>"No severe weather to report" or "gtfo now"</p>
        <p>[insert weather heatmap from api]</p>
      </div>
      <div>
        <h1>Testing fetch</h1>
        <ul>
          {
            this.state.users.map(user =>(
              <li>Username {user.username}, Age: {user.age} </li>
            ))
          }
        </ul>
      </div>
    </div>
    )
  }


}

export default WeatherReport