const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let fbiAPIKey = 'relXeTTdG5NzRK8Xdd3i2BaDtrjudH84Qvzt3Apd'; // FBI Crime Data Key
let googleAPIKey = 'AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0'; // Google Geocoding Key

/* Game Plan to Make This Work
    1. Get the latitude and longitude
    2. Find the location county
    3. From there find the county
    4. 
*/

async function getCrimeData() {

    const getORIData = axios.create({
        // Gets FBI reporting agency data (or ORI's as they call them.)
        // Might be better to cache this? This data is like 7MB
        baseURL: 'https://api.usa.gov/crime/fbi/sapi/api/agencies',
        params: {
            API_KEY: fbiAPIKey
        }
    });
}

async function getLocationData() {

    let testlatlng = '30.6280,-96.3344';

    const getLocationData = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            latlng: testlatlng,
            key: googleAPIKey
        }
    });
    const response = await getLocationData.get("")
    let data = response.data;

    let county = ""; // will hold the county that the user is in

    // This finds the county the user is located in and saves it to a variable
    // Potential Issue?: If no county is found, probably rare though
    for (let i = 0; i < data.results.length; ++i) {
        for (let j = 0; j < data.results[i].address_components.length; ++j) {
            if (data.results[i].address_components[j].types[0] == 'administrative_area_level_2') {
                console.log(data.results[i].address_components[j]['long_name'])
                county = data.results[i].address_components[j]['long_name']
                return;
            }
        }
    }
    return county;
}

router.get('/', async (req, res) => {
    
    let countyLocation = await getLocationData();

    console.log(countyLocation); // for some reason this is undefined? gives an issue
    console.log("Test!");

    if (countyLocation == "Brazos County") {
        console.log("True");
    } else {
        console.log("Something went wrong...");
    }

    res.json([
    ])
})

module.exports = router;