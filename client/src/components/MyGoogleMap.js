import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';
import logo from '../images/logo-40.png';
import police from '../images/police-40.png';
import hospital from '../images/Hospital-40.png';
import pharmacy from '../images/pharmacy-40.png';


const containerStyle = { // dimensions of the map
    width: '100%',
    height: '100%'
}; // TODO: Eventually put this into index.css instead of putting it in the .js file

class MyGoogleMap extends Component {
    static zoom = 12;

    constructor(props) {
        super(props);
        this.state = {
            lat: -96.3376557,
            lng: 30.6262965,
            response: null
        }
        this.directionsCallback = this.directionsCallback.bind(this)
    }

    getPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    componentDidMount() {
        console.log(this.props);
        this.getPosition()
            .then((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
            })
            .catch((err) => {
                console.error(err.message);
                this.setState({lat: -96.3376557, lng: 30.6262965})
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

    directionsCallback(response) {
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({response})
                )
            } else if(response.status === 'OVER_QUERY_LIMIT') {
                console.log('response: ', response)
            }
        }
    }

    componentDidUpdate(){
        console.log("Updated: \n State: ", this.state, "\n Props: ", this.props)
    }

    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: this.state.lat, lng: this.state.lng}}
                    zoom={12}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <Marker
                        icon={logo}
                        label={{text: "Current Location", fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}
                        position={{lat: this.state.lat, lng: this.state.lng}}
                    />
                    <Marker
                        icon={this.getImage()}
                        label={{text: this.props.place_name, fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}
                        position={this.props.place_position}
                    />

                    {
                        (this.props.place_position ?
                        (<DirectionsService
                            // required
                            options={{
                                destination: this.props.place_position,
                                origin: {lat: this.state.lat, lng: this.state.lng},
                                travelMode: 'WALKING',
                                optimizeWaypoints: true
                            }}
                            // required
                            callback={this.directionsCallback}

                            // optional
                            onLoad={directionsService => {
                                console.log('DirectionsService onLoad directionsService: ', directionsService)
                            }}
                            // optional
                            onUnmount={directionsService => {
                                console.log('DirectionsService onUnmount directionsService: ', directionsService)
                            }}
                        />) : <></>) 
                        }
                        {
                        (this.state.response ?
                        (<DirectionsRenderer
                            options={{
                                directions: this.state.response,
                                suppressMarkers: true
                            }}
                            // optional
                            onLoad={directionsRenderer => {
                                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                            }}
                            // optional
                            onUnmount={directionsRenderer => {
                                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                            }}  
                        />) : <></>)
                        
                    }
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MyGoogleMap;