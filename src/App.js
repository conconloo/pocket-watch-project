import React from "react";
import Card from "./Card.js";
import { useState } from "react";
import image1 from './images/logo.png'


const App = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="App">
      <div className="Navbar">
        <div className='logo'>
          <img src={image1} alt='pocket-watch-logo'/>
          <h1>Pocket-Watch</h1>
        </div>
        <div className='links'>
          <button onClick={() => setActive("home")} href="/Home">Home</button>
          <button onClick={() => setActive("weatherreport")} href="/Weather">Weather</button>
        </div>
      </div>
      <div className="card">
        {active === "home" && <Card title = "home"/>}
        {active === "weatherreport" && <Card title = "weatherreport"/>}
        
      </div>
    </div>
  );
}

export default App;
