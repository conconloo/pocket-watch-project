import React from "react";
import { Component } from "react";
import Popup from "../components/popup.js";

import infobtn from '../images/info-button.png';

class Home extends Component {

    constructor(props) {
        super(props);
        this.onShowAlert = this.onShowAlert.bind(this)
        this.onCloseAlert = this.onCloseAlert.bind(this)
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
        this.emergencyAlert = this.emergencyAlert.bind(this)
        this.timer = 0
        this.state = {
            title: '',
            description: '',
            confirm: '',
            okay: true,
            show: false,
            seconds: 10
        };
    }

    onCloseAlert() {
        this.setState({
            okay: true,
            show: false,
            seconds: 10
        })
    }

    onShowAlert() {
        this.setState({
            title: 'Instructions',
            description: "If you start to feel unsafe, press and hold the blue Hold Until Safe button. Once you let go, you will be asked to confirm that you are safe. If you do not confirm your safety within 10 seconds, your location will be sent to police with an emergency message.",
            confirm: 'Got it',
            okay: true,
            show: true
        })
    }

    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
        this.startTimer();
    }

    startTimer() {
        this.setState({
            seconds: 10,
            okay: false
        })
        if(this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        if(this.state.okay === false) {
            let seconds = this.state.seconds - 1;
            this.setState({
                seconds: seconds,
                title: 'Are you okay?',
                description: 'Please confirm your safety. If you do not confirm in ' + this.state.seconds + ' seconds, your location will be sent to police with an emergency message.',
                confirm: "I'm okay",
                okay: false,
                show: true
            });
            if(seconds === -1) {
                clearInterval(this.timer);
                this.emergencyAlert();
                this.onCloseAlert();
            }
        }
    }

    emergencyAlert() {
        console.log("contacting police");
        window.location.href = 'tel:8063175356';
    }

    render(){

        return (

            <div className="Home">
                <div className="SOS">
                    <h2>SOS Features</h2>
                    <div className="InfoBtn">
                        <img src={infobtn} onClick={this.onShowAlert}/>
                    </div>
                </div>
                <div className="NoonlightBtn">
                    <button
                        onTouchStart={this.handleButtonPress}
                        onTouchEnd={this.handleButtonRelease}
                        onMouseDown={this.handleButtonPress}
                        onMouseUp={this.handleButtonRelease}
                        //onMouseLeave={this.handleButtonRelease}
                    >Hold Until Safe</button>
                </div>
                <div className="PoliceBtn">
                    <a href="tel:8063175356"><button title="Dial 911">Dial 911</button></a>
                </div>
                <Popup title={this.state.title} description={this.state.description} confirm={this.state.confirm} onClose={this.onCloseAlert} open={this.state.show}/>
                
            </div>

        )
    }
}

export default Home;