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
            data: [[]]
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
            .then(res => this.setState({query: res}))
    }

    componentDidUpdate(){
        if(this.state.query){
            Object.keys(this.state.query).map( key => (
                console.log(key)
            ))
        } else
        {
            console.log("Empty Query")
        }
    }

    render() {
        return (
            <div className="crimepage">
                    { this.state.query ? Object.keys(this.state.query).map( key => (
                        <p>{key}</p>
                    ))
                    : "No Data"} 

                    

                    
            </div>
        )
    }
}

export default Crime;