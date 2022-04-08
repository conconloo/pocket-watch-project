import React from "react";
import Card from "./Card.js";
import { useState } from "react";
import image1 from './images/logo.png';


const App = () => {
  const [active, setActive] = useState("home");
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
      <div className="Navbar">
        <div className='logo'>
          <img src={image1} alt='pocket-watch-logo' onClick={() => setActive("home")}/>
          <h1>Pocket-Watch</h1>
        </div>
        <button className="hamburger" id="hamburger" onClick={handleHamburger}>
          <i className="fa fa-bars"></i>
        </button>
        <div className='links' id="links">
          <button onClick={() => setActive("home")} href="/Home">Home</button>
          <button onClick={() => setActive("weatherreport")} href="/Weather">Weather</button>
          <button onClick={() => setActive("safetyvideos")} href="/SafetyVideos">Safety Videos</button>
        </div>
      </div>
      <div className="card">
        {active === "home" && <Card title = "home"/>}
        {active === "weatherreport" && <Card title = "weatherreport"/>}  
        {active === "safetyvideos" && <Card title = "safetyvideos"/>} 
      </div>
    </div>
  );
}

export default App;
