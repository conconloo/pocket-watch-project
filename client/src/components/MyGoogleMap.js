import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import logo from '../images/logo-40.png';
import police from '../images/police-40.png';
import hospital from '../images/Hospital-40.png';
import pharmacy from '../images/pharmacy-40.png';


const containerStyle = { // dimensions of the map
    width: '100%',
    height: '100%'
}; // TODO: Eventually put this into index.css instead of putting it in the .js file

class MyGoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0
        }
    }

    getPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    componentDidMount() {
        this.getPosition()
            .then((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
    }

    getImage() {
        switch(this.props.building){
            case 'police':
                return police;
            case 'pharmacy':
                return pharmacy;
            case 'hospital':
                return hospital;
        }
    }

    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: this.state.lat, lng: this.state.lng}}
                    zoom={12} // How zoomed in the map is when it's loaded. This varies between 0-22
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <Marker
                        icon={logo}
                        label={{text: "Current Location", fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}
                        position={{lat: this.state.lat, lng: this.state.lng}}
                    />
                    <Marker
                        icon={this.getImage()}
                        onLoad={console.log(this.props.place_position)} // Used for checking if the coords are in the right place
                        label={{text: this.props.place_name, fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}
                        position={this.props.place_position}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MyGoogleMap;