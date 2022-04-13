import React from "react";
import {Component } from "react";
import {
    Map as GoogleMap,
    Marker,
    GoogleApiWrapper,

} from "google-maps-react";



class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: [],
            places: []
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



    render(){
        return(
        <div>
            <h1>From Query</h1>
            {this.state.query.map(place => (
                <>
                <p>{place.name}</p>
                <p>{place.vicinity}</p>
                <p>{place.rating}</p>
                <p>{place.place_id}</p>
                <br></br>
                </>
            ))}
            <iframe className="GoogleMap">
                <GoogleMap google={this.props.google}>
                    <Marker />
                </GoogleMap>
            </iframe>
        </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0')
}) (MyMap);