import React from "react";
import {Component } from "react";
import police_image from '../images/police.png';
import pharmacy_image from '../images/pharmacy.png';
import hospital_image from '../images/Hospital.png';
import MyGoogleMap from "../components/MyGoogleMap";
import LoadingSpinner from "../components/LoadingSpinner";

class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            building: '',
            query: [],
            place: '',
            place_name: '',
            place_position: {
                latitude: 0,
                longitude: 0
            },
            loading: false
        }
    }


    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    getBuildings = (type) => {
        this.setState({loading: true})
        this.setState(type === this.state.building ? {building: type} : {building: type, place: '', place_name: '', place_position: undefined})
        fetch('api/places?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&building=' + (type ? type : 'police'))
                .then((res) => res.json())
                .then(res => this.setState({query: res, loading: false}))
    }

    componentDidMount(){
        this.getPosition()
        .then((position) => {
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
            })
    }

    getGoogleMap(props){
        this.setState({place: props.place_id, place_position: props.geometry.location, place_name: props.name})
    }

    render(){
        return(
        <div className="myMap">
            <div className="Map-buttons">
                <button className="police" title="Police" onClick={() => this.getBuildings('police')}>
                    <img src={police_image} />
                    <h4>Police</h4>
                </button>
                <button className="hospital" title="Hospital" onClick={() => this.getBuildings('hospital')}>
                    <img src={hospital_image} />
                    <h4>Hospital</h4>
                    </button>
                <button className="pharmacy" title="Pharmacy" onClick={() => this.getBuildings('pharmacy')}>
                    <img src={pharmacy_image} />
                    <h4>Pharmacy</h4>
                    </button>
            </div>
            <div className="places-list">
                {this.state.loading ?
                <LoadingSpinner/>
                : this.state.query.map(place => (
                    <button key={place.place_id} onClick={() => this.getGoogleMap(place)}>
                    <h3>{place.name}</h3>
                    <p>{place.vicinity}</p>
                    </button>
                ))}
            </div>
            <div id="GoogleMap" className="GoogleMap">
                <MyGoogleMap building={this.state.building} place={this.state.place} place_position={this.state.place_position} place_name={this.state.place_name}/>
                {/*Testing Google Map component*/}
            </div>
        </div>
        )
    }
}

export default MyMap;