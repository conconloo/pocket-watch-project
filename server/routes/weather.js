const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = '' // remove this before pushing

// function that returns the position of the current device
function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function getWeatherData() {
    let locationData = await getPosition();
    let units = 'imperial';
    const getWeatherData = axios.create({
       baseURL: `https://api.openweathermap.org/data/2.5/onecall`,
        params: {
            lat: locationData.coords.latitude,
            lon: locationData.coords.longitude,
            units: 'imperial',
            appid: apiKey
        }
    });
    const response = await getWeatherData.get("");
    console.log(response.data);
}