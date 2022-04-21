import React, {Component} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import logo from '../images/logo-40.png';
import police from '../images/police-40.png';
import hospital from '../images/Hospital-40.png';
import pharmacy from '../images/pharmacy-40.png';


const containerStyle = { // dimensions of the map
    width: '100%',
    height: '400px'
}; // TODO: Eventually put this into index.css instead of putting it in the .js file

class MyGoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            response: null,
            travelMode: 'WALKING',
            city_name: '',
            destination: ''
        }
        this.directionsCallback = this.directionsCallback.bind(this)
        this.getDestination = this.getDestination.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
    }

    getPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getCityName = async (latitude, longitude) => {
        fetch('api/currweather?lat=' + latitude + '&lon=' + longitude)
            .then(res => res.json())
            .then(weather => {
                this.setState({city_name: weather[0].name});
            });
    }

    componentDidMount() {
        this.getPosition()
            .then((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
                this.getCityName(position.coords.latitude, position.coords.longitude);
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

    directionsCallback (response) {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }

    getDestination (ref) {
        this.destination = ref
    }

    onClick () {
        if (this.destination) {
            this.setState(
                () => ({
                    destination: this.destination.value
                })
            )
        }
    }

    onMapClick (...args) {
        console.log('onClick args: ', args)
    }

    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0"
            >
                <div className='map'>
                    <div className='map-settings'>
                        <hr className='mt-0 mb-3' />
                        <div className='row'>
                            <div className='col-md-6 col-lg-4'>
                                <div className='form-group'>
                                    <label htmlFor='ORIGIN'>Origin</label>
                                    <br />
                                    <input id='ORIGIN' className='form-control' type='text' value={this.state.city_name} readOnly />
                                </div>
                            </div>

                            <div className='col-md-6 col-lg-4'>
                                <div className='form-group'>
                                    <label htmlFor='DESTINATION'>Destination</label>
                                    <br />
                                    <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary' type='button' onClick={this.onClick}>
                            Build Route
                        </button>
                    </div>

                    <div className='map-container'>
                        <GoogleMap
                            // required
                            id='direction-example'
                            // required
                            mapContainerStyle={containerStyle}
                            // required
                            zoom={12}
                            // required
                            center={{
                                lat: this.state.lat,
                                lng: this.state.lng
                            }}
                            // optional
                            onClick={this.onMapClick}
                            // optional
                            onLoad={map => {
                                console.log('DirectionsRenderer onLoad map: ', map)
                            }}
                            // optional
                            onUnmount={map => {
                                console.log('DirectionsRenderer onUnmount map: ', map)
                            }}
                        >
                            {
                                (
                                    this.state.destination !== '' &&
                                    this.state.city_name !== ''
                                ) && (
                                    <DirectionsService
                                        // required
                                        options={{
                                            destination: this.state.destination,
                                            origin: this.state.city_name,
                                            travelMode: this.state.travelMode
                                        }}
                                        // required
                                        callback={this.directionsCallback}
                                        // optional
                                        onLoad={directionsService => {
                                            console.log('DirectionsService onLoad directionsService: ', directionsService)
                                            console.log("TEST" + this.props.place_position)
                                        }}
                                        // optional
                                        onUnmount={directionsService => {
                                            console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                        }}
                                    />
                                )
                            }

                            {
                                this.state.response !== null && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: this.state.response
                                        }}
                                        // optional
                                        onLoad={directionsRenderer => {
                                            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                        }}
                                        // optional
                                        onUnmount={directionsRenderer => {
                                            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                        }}
                                    />
                                )
                            }
                        </GoogleMap>
                    </div>
                </div>
                {/*<GoogleMap*/}
                {/*    mapContainerStyle={containerStyle}*/}
                {/*    center={{lat: this.state.lat, lng: this.state.lng}}*/}
                {/*    zoom={12} // How zoomed in the map is when it's loaded. This varies between 0-22*/}
                {/*>*/}
                {/*    { /* Child components, such as markers, info windows, etc. *!/*/}
                {/*    <Marker*/}
                {/*        icon={logo}*/}
                {/*        label={{text: "Current Location", fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}*/}
                {/*        position={{lat: this.state.lat, lng: this.state.lng}}*/}
                {/*    />*/}
                {/*    <Marker*/}
                {/*        icon={this.getImage()}*/}
                {/*        onLoad={console.log(this.props.place_position)} // Used for checking if the coords are in the right place*/}
                {/*        label={{text: this.props.place_name, fontFamily: 'Verdana, sans-serif', fontSize: '2vh', className: 'marker'}}*/}
                {/*        position={this.props.place_position}*/}
                {/*    />*/}
                {/*</GoogleMap>*/}
            </LoadScript>
        )
    }
}

export default MyGoogleMap;