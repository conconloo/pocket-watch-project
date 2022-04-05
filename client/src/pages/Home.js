import React from "react";
import { Component } from "react";

import Popup from "../components/popup.js"

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type:'warning',
            text:'instructions',
            show:false
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
            type:'',
            text:'',
            show:false
        })
    }

    onShowAlert() {
        this.setState({
            type:'warning',
            text:'Instructions',
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
                    <button>Hold Until Safe</button>
                </div>
                <div className="PoliceBtn">
                    <a href="tel:8063175356"><button title="Dial 911">911</button></a>
                </div>
                <Popup onClose={this.onCloseAlert.bind(this)} open={this.state.show}/>
                
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