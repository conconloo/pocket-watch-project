import React from "react";
import { Component } from "react";
import { Chart } from "react-google-charts";
import Popup from "../components/popup"

class Crime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 30.601389,
            lng: -96.314445,
            city: '',
            station_name: 0.0,
            crime_rate_change: 0.0,
            data: null,
            show: false
        }
    }

    getCityName() {
        fetch('api/currweather?lat=' + this.state.lat + '&lon=' + this.state.lng)
          .then(res => res.json())
          .then(weather => {
            this.setState({city: weather[0].city.name});
          })
          
      }

    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async componentDidMount(){
        try{
        await this.getPosition()
        .then((position) => {
                console.log(position)
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        .then(this.getCityName())
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
            } catch(e) {
                console.log(e.name + ": " + e.message);
                this.setState({show: true})
            }

    }

/*     componentDidUpdate(){
        console.log(this.state)
    }
 */
    render() {
        return (
            <div className="crimepage">
                    { this.state.data ? 
                    <Chart
                        className="Crime-Chart"
                        chartType="Bar"
                        data={this.state.data}
                        options={{chart: {title: "Crimes Commited near " + this.state.city , subtitle: "Reported by " + this.state.station_name }}}
                    />
                    : <h1>Gathering Data...</h1>}
                    <Popup title={"Location Blocked"} description={"Please Share your location and refresh the page"} confirm={"OK"} onClose={() => this.setState({show: false})} open={this.state.show}/> 
                    

                    

                    
            </div>
        )
    }
}

export default Crime;