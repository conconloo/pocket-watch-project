import React from "react";
import Home from "./pages/Home";
import WeatherReport from "./pages/WeatherReport.js";
import SafetyVideos from "./pages/SafetyVideos.js";


const Card = ({title}) => {
    if( title === "home" ){
        return <Home />
    } else if (title === "weatherreport") {
        return <WeatherReport />
    } else if (title === "safetyvideos") {
        return <SafetyVideos />
    }
}
 
export default Card;