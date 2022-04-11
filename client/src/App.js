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
              <Link className="link" to="/weather">Weather</Link>
              <Link className="link" to="/videos">Videos</Link>
              <Link className="link" to="/map">Map</Link>
              <Link className="link" to="/">Home</Link>
            </div>
          </div>
            <Routes>
              <Route path="/" element={<Card title="home"/>}/>
              <Route path="/weather" element={<Card title="weatherreport"/>} />
              <Route path="/videos" element={<Card title="safetyvideos"/>}/>
              <Route path="/map" element={<Card title="map"/>}/>
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;