import React, {Component} from "react";
import police_image from '../images/police.png';
import pharmacy_image from '../images/pharmacy.png';
import hospital_image from '../images/Hospital.png';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from "@react-google-maps/api";

const containerStyle = { // dimensions of the map
    width: '100%',
    height: '400px'
};

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            building: '',
            query: [],
            place: '',
            place_name: '',
            place_vicinity: '',
            place_position: {
                latitude: 0,
                longitude: 0
            },
            response: null,
            travelMode: 'WALKING',
            city_name: '',
        }
        this.directionsCallback = this.directionsCallback.bind(this)
    }


    getPosition = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getBuildings = (type) => {
        this.setState(type === this.state.building ? {building: type} : {
            building: type,
            place: '',
            place_name: '',
            place_position: undefined
        })
        fetch('api/places?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&building=' + (type ? type : 'police'))
            .then((res) => res.json())
            .then(res => this.setState({query: res}))
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
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
                this.getCityName(position.coords.latitude, position.coords.longitude);
            })
    }

    getGoogleMap(props) {
        console.log(props.place_id, ":place_id\n", props.geometry.location, ":geometry\n", props.vicinity, ":vicinity")
        this.setState({
            place: props.place_id,
            place_position: props.geometry.location,
            place_name: props.name,
            place_vicinity: props.vicinity
        })

    }

    directionsCallback(response) {
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

    render() {
        return (
            <div className="myMap">
                <div className="Map-buttons">
                    <button className="police" onClick={() => this.getBuildings('police')}>
                        Police <br/>
                        <img src={police_image}/>
                    </button>
                    <button className="hospital" onClick={() => this.getBuildings('hospital')}>
                        Hospital<br/>
                        <img src={hospital_image}/>
                    </button>
                    <button className="pharmacy" onClick={() => this.getBuildings('pharmacy')}>
                        Pharmacy<br/>
                        <img src={pharmacy_image}/>
                    </button>
                </div>
                <div className="places-list">
                    {this.state.query.map(place => (
                        <button key={place.place_id} onClick={() => this.getGoogleMap(place)}>
                            <p>{place.name}</p>
                            <p>{place.vicinity}</p>
                        </button>
                    ))}
                </div>
                <div id="GoogleMap" className="GoogleMap">
                    <LoadScript
                        googleMapsApiKey="AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0"
                    >
                        <div className='map'>
                            <div className='map-settings'>
                                <hr className='mt-0 mb-3'/>
                                <div className='row'>
                                    <div className='col-md-6 col-lg-4'>
                                        <div className='form-group'>
                                            <label htmlFor='ORIGIN'>Origin</label>
                                            <br/>
                                            <input id='ORIGIN' className='form-control' type='text' size={75}
                                                   value={this.state.city_name} readOnly/>
                                        </div>
                                    </div>

                                    <div className='col-md-6 col-lg-4'>
                                        <div className='form-group'>
                                            <label htmlFor='DESTINATION'>Destination</label>
                                            <br/>
                                            <input id='DESTINATION' className='form-control' type='text' size={75}
                                                   value={this.state.place_vicinity} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='map-container'>
                                <GoogleMap
                                    // required
                                    id='directions'
                                    // required
                                    mapContainerStyle={containerStyle}
                                    // required
                                    zoom={12}
                                    // required
                                    center={{
                                        lat: this.state.latitude,
                                        lng: this.state.longitude
                                    }}

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
                                            this.state.place_position
                                        ) && (
                                            <DirectionsService
                                                // required
                                                options={{
                                                    destination: this.state.place_position,
                                                    origin: {lat: this.state.latitude, lng: this.state.longitude},
                                                    travelMode: this.state.travelMode
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
                </div>
            </div>
        )
    }
}

export default MyMap;