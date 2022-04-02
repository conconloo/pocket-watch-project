import React from "react";
import WeatherReport from "./pages/WeatherReport.js";
import Navbar from "./Navbar.js";

function App() {

  return (
    <div className="App">
      <div className="Navbar">
        <Navbar />
      </div>
      <div>
        {/* This will be {Page}*/}
        <WeatherReport />
      </div>
    </div>
  );
}

export default App;
