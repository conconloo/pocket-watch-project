import React from "react";
import Home from "./pages/Home";
import WeatherReport from "./pages/WeatherReport.js";
import SafetyVideos from "./pages/SafetyVideos.js";
import Map from "./pages/Map.js";

const Card = (props) => {
    if( props.title === "home" ){
        return <Home />
    } else if (props.title === "weatherreport") {
        return <WeatherReport />
    } else if (props.title === "safetyvideos") {
        return <SafetyVideos />
    } else if (props.title === "map") {
        return <Map />
    }
}
 
export default Card;