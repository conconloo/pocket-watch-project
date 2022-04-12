import React from "react";
import {Component } from "react";

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {

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
                .then(res => res.json())
                .then()
        })
    }



    render(){
        return(
        <div>
            <h1>Header</h1>
        </div>
        )
    }
}

export default Map;