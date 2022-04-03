import React from "react";
import Home from "./Home";
import WeatherReport from "./pages/WeatherReport.js";


const Card = ({title}) => {
    if( title === "home" ){
        return <Home />
    } else if (title === "weatherreport") {
        return <WeatherReport />
    }
}
 
export default Card;