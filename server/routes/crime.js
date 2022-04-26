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

async function getORIData() {

    const getORIData = axios.create({
        // Gets FBI reporting agency data (or ORI's as they call them.)
        // Might be better to cache this? This data is like 7MB
        baseURL: 'https://api.usa.gov/crime/fbi/sapi/api/agencies',
        params: {
            API_KEY: fbiAPIKey
        }
    });

    const response = await getORIData.get("");
    let data = response.data;

    return data;
}

async function getLocationData() {
    // Also need to get the state name

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
    let state = "";

    // This finds the county the user is located in and saves it to a variable
    // Potential Issue?: If no county is found, probably rare though
    county:
    for (let i = 0; i < data.results.length; ++i) {
        for (let j = 0; j < data.results[i].address_components.length; ++j) {
            if (data.results[i].address_components[j].types[0] == 'administrative_area_level_2') {
                county = data.results[i].address_components[j]['long_name']
                break county;
            }
        }
    }

    // This finds the state the user is located in and saves it to a variable
    state:
    for (let i = 0; i < data.results.length; ++i) {
        for (let j = 0; j < data.results[i].address_components.length; ++j) {
            if (data.results[i].address_components[j].types[0] == 'administrative_area_level_1') {
                state = data.results[i].address_components[j]['short_name']
                break state;
            }
        }
    }

    return {"county": county, "state": state};
}

async function getCrimeData(ori, startDate, endDate) {

    const getCrimeData = axios.create({
        // Gets summarized crime data
        baseURL: `https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/${ori}/offenses/${startDate}/${endDate}`,
        params: {
            API_KEY: fbiAPIKey
        }
    });

    const response = await getCrimeData.get("");
    let data = response.data;

    return data;
}

router.get('/', async (req, res) => {
    
    let locationInfo = await getLocationData(); // gets the county location

    let fbiORI = await getORIData(); // gets all of the ORI data

    let county = locationInfo['county'];

    // Allows for counties to be compared
    county = county.replace('County', '');
    county = county.trim();
    county = county.toUpperCase();

    let state = locationInfo['state'];

    console.log(county);

    let oriResults = [];

    // This will find ORI's depending on the county
    // Maybe also include more info such as the police station name?
    // Cache the FBI ORI data

    for (const [key, value] of Object.entries(fbiORI[state])) {
        if (fbiORI[state][key]['county_name'] == county) {
            let oriString = String(fbiORI[state][key]['ori']);
            oriResults.push({"ori": oriString, "latitude": fbiORI[state][key]['latitude'], "longitude": fbiORI[state][key]['longitude']});
        }
    }

    // Find the closest police station using magnitude
    let magnitude = 1000000; // not the ideal way, but should work
    let tempMagnitude = 0;
    let closestORI = "";

    for (let i = 0; i < oriResults.length; ++i) {
        let oriLat = oriResults[i]['latitude'];
        let oriLang = oriResults[i]['longitude'];
        tempMagnitude = Math.pow(oriLat, 2) + Math.pow(oriLang, 2);
        if (tempMagnitude <= magnitude) {
            magnitude = tempMagnitude;
            closestORI = oriResults[i]['ori'];
        }
    }

    let crimeData = await getCrimeData(closestORI, "2010", "2020");

    res.json([
        crimeData
    ])
})

module.exports = router;