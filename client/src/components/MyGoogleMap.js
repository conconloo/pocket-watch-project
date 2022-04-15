import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { // dimensions of the map
    width: '400px',
    height: '400px'
}; // TODO: Eventually put this into index.css instead of putting it in the .js file

const center = { // Hard coded latitude and longitude values to be College Station but in the future make them variable based on user location
    lat: 30.601389,
    lng: -96.314445
};

const position = {
    lat: 30.701389,
    lng: -96.314445
}


class MyGoogleMap extends Component {
    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12} // How zoomed in the map is when it's loaded. This varies between 0-22
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <Marker // Examples for placing markers onto the Google Map given a position
                        position={center}
                    />
                    <Marker
                        position={position}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MyGoogleMap;