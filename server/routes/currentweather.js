const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = '207a527a4d31d2de8a7264f13e8ad6a2'; // remove this before pushing

async function getCurrentWeatherData(req) {
    // let locationData = await getPosition();

    // temporary coordinates for College Station

    let latitude = req.query.lat;
    let longitude = req.query.lon;

    let units = 'imperial';
    const getCurrentWeatherData = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            lat: latitude,
            lon: longitude,
            units: units,
            appid: apiKey
        }
    });
    const response = await getCurrentWeatherData.get(""); // gets info from Weather API
    //console.log(response.data);
    return response.data; // returns all of the data from the response
}

router.get('/', async (req, res) => {
    const data = await getCurrentWeatherData(req);
    res.json([
        data
    ]);
})

module.exports = router;