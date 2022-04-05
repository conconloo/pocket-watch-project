import React from "react";
import { Component } from "react";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('api/users')
            .then(res => res.json())
            .then(users => {
                this.setState({users : users});
            });
    }

    render(){
        return (
            <div>
                <h1>Pocket-Watch</h1>
                <div className="SOS">
                    <h2>SOS Features</h2>
                    <a href="tel:8063175356"><button className="Police" title="Dial 911">911</button></a>
                    <button className="Noonlight">Hold Until Safe</button>
                </div>
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