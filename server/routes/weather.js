const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = '207a527a4d31d2de8a7264f13e8ad6a2'; // remove this before pushing

// function that returns the position of the current device
// Might have to be on the front end?

// function getPosition() {
//     return new Promise((res, rej) => {
//         navigator.geolocation.getCurrentPosition(res, rej);
//     });
// }

async function getWeatherData(req) {
    // let locationData = await getPosition();

    // temporary coordinates for College Station
    
    let latitude = req.query.lat;
    let longitude = req.query.lon;   

    let units = 'imperial';
    const getWeatherData = axios.create({
       baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
        params: {
            lat: latitude,
            lon: longitude,
            units: units,
            appid: apiKey
        }
    });
    const response = await getWeatherData.get(""); // gets info from Weather API
    //console.log(response.data);
    return response.data; // returns all of the data from the response
}

async function getWeatherDataCurrent(req) {
    // let locationData = await getPosition();

    // temporary coordinates for College Station

    let latitude = req.query.lat;
    let longitude = req.query.lon;

    let units = 'imperial';
    const getWeatherDataCurrent = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            lat: latitude,
            lon: longitude,
            units: units,
            appid: apiKey
        }
    });
    const response = await getWeatherDataCurrent.get(""); // gets info from Weather API
    //console.log(response.data);
    return response.data; // returns all of the data from the response
}

router.get('/', async (req, res) => {
    const data = await getWeatherData(req);
    const data2 = await getWeatherDataCurrent(req);
    res.json([
        data,
        data2
    ]);
})

module.exports = router;