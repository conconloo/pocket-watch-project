import React, { Component } from "react";
import axios from "axios";

export default class WeatherAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '207a527a4d31d2de8a7264f13e8ad6a2',
            latitude: -1,
            longitude: -1,
            units: 'imperial',
            requestLink: `Null`,
            city: "Null",
            temperature: "Null",
            weather_description: "Null"
        };
    }
    /* function for obtaining weather information from the weather API */
    handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }
        );

        // access the API with the parameters obtained from the geo location API
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${this.state.apiKey}&units=${this.state.units}`).then((response) => {
            this.setState({
                city: response.data.name, // gets the name of the city at the latitude and longitude coordinates provided
                temperature: response.data.main.temp, // gets the current temperature of the city
                weather_description: response.data.weather.description // gets the description of the current weather of the city

            });
        });
};
    /* This displays the information in HTML */
    // render() {
    //     return (
    //         <div>
    //             <button onClick={this.handleCurrentLocation}>Testing Weather API</button>
    //             <h1>The weather in {this.state.city}</h1>
    //             <p>The temperature is: {this.state.temperature}</p>
    //             <p>The weather description is: {this.state.weather_description}</p>
    //         </div>
    //     );
    // }
}