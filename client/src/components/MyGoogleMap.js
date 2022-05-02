import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService, Polygon} from '@react-google-maps/api';
import logo from '../images/logo-40.png';
import police from '../images/police-40.png';
import hospital from '../images/Hospital-40.png';
import pharmacy from '../images/pharmacy-40.png';
import LoadingSpinner from './LoadingSpinner';


const containerStyle = { // dimensions of the map
    width: '100%',
    height: '100%'
}; // TODO: Eventually put this into index.css instead of putting it in the .js file

const libs = ["visualization", "places"] // libraries needed for Google Maps to allow components to work

class MyGoogleMap extends Component {
    static zoom = 12;

    constructor(props) {
        super(props);
        this.state = {
            lat: -96.3376557,
            lng: 30.6262965,
            response: null,
            crime_data: [],
            total_mag: 0,
            buttonText: true,
            show: false
        }
        this.directionsCallback = this.directionsCallback.bind(this)
    }

    getPosition = async () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getCrime = async() => {
        await fetch('api/crimeheatmap')
            .then(res => res.json())
            .then(data => {
                this.setState({crime_data: data})
            })
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
        this.getCrime();
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
                libraries={libs}
                loadingElement={<LoadingSpinner/>}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={{styles: [
                        {
                          "featureType": "administrative",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "poi",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "road",
                          "elementType": "labels.icon",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "transit",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        }
                      ]}}
                    center={{lat: this.state.lat, lng: this.state.lng}}
                    zoom={MyGoogleMap.zoom}
                    
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

                    {this.state.crime_data[0] ? 
                            <Polygon
                                paths={this.state.crime_data[0].square}
                                options={{fillColor: `rgb(${this.state.crime_data[0].mag/56988*255*10},${(56988 - this.state.crime_data[0].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[1] ? 
                            <Polygon
                                paths={this.state.crime_data[1].square}
                                options={{fillColor: `rgb(${this.state.crime_data[1].mag/56988*255*10},${(56988 - this.state.crime_data[1].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[2] ? 
                            <Polygon
                                paths={this.state.crime_data[2].square}
                                options={{fillColor: `rgb(${this.state.crime_data[2].mag/56988*255*10},${(56988 - this.state.crime_data[2].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[3] ? 
                            <Polygon
                                paths={this.state.crime_data[3].square}
                                options={{fillColor: `rgb(${this.state.crime_data[3].mag/56988*255*10},${(56988 - this.state.crime_data[3].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[4] ? 
                            <Polygon
                                paths={this.state.crime_data[4].square}
                                options={{fillColor: `rgb(${this.state.crime_data[4].mag/56988*255*10},${(56988 - this.state.crime_data[4].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[5] ? 
                            <Polygon
                                paths={this.state.crime_data[5].square}
                                options={{fillColor: `rgb(${this.state.crime_data[5].mag/56988*255*10},${(56988 - this.state.crime_data[5].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[6] ? 
                            <Polygon
                                paths={this.state.crime_data[6].square}
                                options={{fillColor: `rgb(${this.state.crime_data[6].mag/56988*255*10},${(56988 - this.state.crime_data[6].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[7] ? 
                            <Polygon
                                paths={this.state.crime_data[7].square}
                                options={{fillColor: `rgb(${this.state.crime_data[7].mag/56988*255*10},${(56988 - this.state.crime_data[7].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[8] ? 
                            <Polygon
                                paths={this.state.crime_data[8].square}
                                options={{fillColor: `rgb(${this.state.crime_data[8].mag/56988*255*10},${(56988 - this.state.crime_data[8].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[9] ? 
                            <Polygon
                                paths={this.state.crime_data[9].square}
                                options={{fillColor: `rgb(${this.state.crime_data[9].mag/56988*255*10},${(56988 - this.state.crime_data[9].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[10] ? 
                            <Polygon
                                paths={this.state.crime_data[10].square}
                                options={{fillColor: `rgb(${this.state.crime_data[10].mag/56988*255*10},${(56988 - this.state.crime_data[10].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[11] ? 
                            <Polygon
                                paths={this.state.crime_data[11].square}
                                options={{fillColor: `rgb(${this.state.crime_data[11].mag/56988*255*10},${(56988 - this.state.crime_data[11].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[12] ? 
                            <Polygon
                                paths={this.state.crime_data[12].square}
                                options={{fillColor: `rgb(${this.state.crime_data[12].mag/56988*255*10},${(56988 - this.state.crime_data[12].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[13] ? 
                            <Polygon
                                paths={this.state.crime_data[13].square}
                                options={{fillColor: `rgb(${this.state.crime_data[13].mag/56988*255*10},${(56988 - this.state.crime_data[13].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}{this.state.crime_data[14] ? 
                            <Polygon
                                paths={this.state.crime_data[14].square}
                                options={{fillColor: `rgb(${this.state.crime_data[14].mag/56988*255*10},${(56988 - this.state.crime_data[14].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}

                            />
                        
                        : console.log("undefined")}{this.state.crime_data[15] ? 
                            <Polygon
                                paths={this.state.crime_data[15].square}
                                options={{fillColor: `rgb(${this.state.crime_data[15].mag/56988*255*10},${(56988 - this.state.crime_data[15].mag)/56988*255*10},0)`,
                                            strokeWeight: '0.5'}}
                            />
                        
                        : console.log("undefined")}

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