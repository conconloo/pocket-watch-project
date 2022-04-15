import React from "react";
import {Component } from "react";
import police_image from '../images/police.png';
import pharmacy_image from '../images/pharmacy.png';
import hospital_image from '../images/Hospital.png';
import GoogleMap from "../components/MyGoogleMap";

class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            building: '',
            query: []
        }
    }


    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }

    getBuildings = (type) => {
        this.setState({building: type})
        fetch('api/places?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&building=' + (type ? type : 'police'))
                .then((res) => res.json())
                .then(res => this.setState({query: res}))
    }

    componentDidMount(){
        this.getPosition()
        .then((position) => {
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
            })
    }



    render(){
        return(
        <div>
            <div className="Map-buttons">
                <button className="police" onClick={() => this.getBuildings('police')}>
                    Police <br/>
                    <img src={police_image} />
                </button>
                <button className="hospital" onClick={() => this.getBuildings('hospital')}>
                    Hospital<br/>
                    <img src={hospital_image} />
                    </button>
                <button className="pharmacy" onClick={() => this.getBuildings('pharmacy')}>
                    Pharmacy<br/>
                    <img src={pharmacy_image} />
                    </button>
            </div>
            <div className="places-list">
                {this.state.query.map(place => (
                    <button>
                    <p>{place.name}</p>
                    <p>{place.vicinity}</p>
                    </button>
                ))}
            </div>
            <GoogleMap/>
            {/*Testing Google Map component*/}
        </div>
        )
    }
}

export default MyMap;