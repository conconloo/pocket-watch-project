import React from "react";
import {Component } from "react";


class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: [],
            places: [{
                name: '',
                address: '',

            }]
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
            fetch('api/places?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude)
                .then((res) => res.json())
                .then(res => this.setState({query: res}))
        })
    }



    render( ){
        return(
        <div>
            <h1>Header</h1>
            {this.state.query.map(place => (
                <>
                <p>{place.name}</p>
                <p>{place.vicinity}</p>
                <p>{place.rating}</p>
                <p>{place.place_id}</p>
                <br></br>
                </>
            ))}
            <iframe 
            className="testFrame"
            src="https://www.google.com/maps/embed/v1/place
                ?key=AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0
                &q=place_id:ChIJs--MqP1YwokRBwAhjXWIHn8"></iframe>
        </div>
        )
    }
}

export default Map;