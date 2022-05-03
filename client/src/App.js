import React from "react";
import Card from "./Card.js";
import { 
  useState,
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import image1 from './images/logo.png';
import homeicon from "./images/home.png";
import mapicon from "./images/map.png";
import crimeicon from "./images/handcuff.png";
import weathericon from "./images/weather.png";
import videoicon from "./images/videos.png";

const App = () => {  

  const [hamburgerClicked, sethamburgerClicked] = useState(false);

  const handleHamburger = () => {
    const dropDownNav = document.getElementById("links");
    if(!hamburgerClicked){
      dropDownNav.classList.toggle('show');
      sethamburgerClicked(true);
    } else {
      dropDownNav.classList.toggle('show');
      sethamburgerClicked(false);
    }

  }

  return (
    <div className="App">
      
      <Router>
        <div>
          <div className="Navbar">
            <a href="/">
              <div className='logo'>
                <img src={image1} alt='pocket-watch-logo'/>
                <h1>Pocket Watch</h1>
              </div> 
            </a>
            <button className="hamburger" id="hamburger" onClick={handleHamburger}>
              <i className="fa fa-bars"></i>
            </button>
            <div className='links' id="links">
              <Link className="link" to="/videos">
                <div className="NavbarLink">
                  <img src={videoicon}></img>
                  Videos
                </div>
              </Link>
              <Link className="link" to="/weather">
                <div className="NavbarLink">
                  <img src={weathericon}></img>
                  Weather
                </div>
              </Link>
              <Link className="link" to="/crime">
                <div className="NavbarLink">
                  <img src={crimeicon}></img>
                  Crime
                </div>
              </Link>
              <Link className="link" to="/map">
                <div className="NavbarLink">
                  <img src={mapicon}></img>
                  Map
                </div>
              </Link>
              <Link className="link" to="/">
                <div className="NavbarLink">
                  <img src={homeicon}></img>
                  Home
                </div>
              </Link>
            </div>
          </div>
          <div className="Card">
            <Routes>
              <Route path="/" element={<Card title="home"/>}/>
              <Route path="/weather" element={<Card title="weatherreport"/>} />
              <Route path="/videos" element={<Card title="safetyvideos"/>}/>
              <Route path="/crime" element={<Card title="crime"/>}/>
              <Route path="/map" element={<Card title="map"/>}/>
            </Routes>
            </div>
        </div>
      </Router>
    </div>
  );
}

export default App;