import React from 'react'


function WeatherReport() {
  return (
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
    </div>
  )
}

export default WeatherReport