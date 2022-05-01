import React from "react";
import { Component } from "react";
import { Chart } from "react-google-charts";

class Crime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 30.601389,
            lng: -96.314445,
            query: undefined,
            station_name: 0.0,
            crime_rate_change: 0.0,
            data: null
        }
    }

    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    componentDidMount(){
        this.getPosition()
        .then((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        fetch('api/crime?lat=' + this.state.lat + '&lng=' + this.state.lng)
            .then((res) => res.json())
            .then(res => {
                var result = [["Year", "Crimes Committed"]];
                for(var i in res)
                    if(i !== "station_name" && i !== "crime_rate_change"){
                        result.push([i, res[i]]);
                    }
                this.setState({data: result})
                this.setState({
                    station_name: res["station_name"],
                    crime_rate_change: res["crime_rate_change"]
                })}) 

    }

    componentDidUpdate(){
        console.log(this.state)
    }

    render() {
        return (
            <div className="crimepage">
                <div className="Crime-Chart">
                    { this.state.data ? 
                    <Chart
                        chartType="Bar"
                        width="40vw"
                        height="40vh"
                        data={this.state.data}
                        options={{chart: {title: "Crimes Commited near " , subtitle: "Reported by " + this.state.station_name }}}
                    />
                    : <h1>Gathering Data...</h1>} 
                </div>  
                    

                    

                    
            </div>
        )
    }
}

export default Crime;