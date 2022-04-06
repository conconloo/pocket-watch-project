import React from "react";
import { Component } from "react";

import Popup from "../components/popup.js"

class Home extends Component {

    constructor(props) {
        super(props);
        this.onShowAlert = this.onShowAlert.bind(this)
        this.onCloseAlert = this.onCloseAlert.bind(this)
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
        this.state = {
            title: '',
            description: '',
            confirm: '',
            show: false
        };
    }

    componentDidMount() {
        fetch('api/users')
            .then(res => res.json())
            .then(users => {
                this.setState({users : users});
            });
    }

    onCloseAlert() {
        this.setState({
            show:false
        })
    }

    onShowAlert() {
        this.setState({
            title: 'Instructions',
            description: "If you start to feel unsafe, press and hold the blue Hold Until Safe button. Once you let go, you will be asked to confirm that you are safe. If you do not confirm your safety within 10 seconds, your location will be sent to police with an emergency message.",
            confirm: 'Got it',
            show:true
        })
    }

    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
        this.setState({
            title: 'Are you okay?',
            description: 'Please confirm your safety. If you do not confirm in 10 seconds, your location will be sent to police with an emergency message.',
            confirm: "I'm okay",
            show:true
        })
    }

    render(){

        return (
            <div>
                <h1>Pocket-Watch</h1>
                <div className="SOS">
                    <h2>SOS Features</h2>
                    <div className="InfoBtn">
                        <button onClick={this.onShowAlert.bind(this)}>Info</button>
                    </div>
                </div>
                <div className="NoonlightBtn">
                    <button
                        onTouchStart={this.handleButtonPress}
                        onTouchEnd={this.handleButtonRelease}
                        onMouseDown={this.handleButtonPress}
                        onMouseUp={this.handleButtonRelease}
                        onMouseLeave={this.handleButtonRelease}
                    >Hold Until Safe</button>
                </div>
                <div className="PoliceBtn">
                    <a href="tel:8063175356"><button title="Dial 911">911</button></a>
                </div>
                <Popup title={this.state.title} description={this.state.description} confirm={this.state.confirm} onClose={this.onCloseAlert.bind(this)} open={this.state.show}/>
                
            </div>

            /*
            <ul>
                {
                    this.state.users.map(user =>(
                        <li>Username {user.username}, Age: {user.age}</li>
                    ))
                }
            </ul>
            */
        )
    }
}

/*
const Home = () => {
    return (
        <div>
            This is a Home page.
        </div>
    )
}
*/

export default Home;