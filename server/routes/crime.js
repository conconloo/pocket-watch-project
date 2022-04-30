const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let fbiAPIKey = 'relXeTTdG5NzRK8Xdd3i2BaDtrjudH84Qvzt3Apd'; // FBI Crime Data Key
let googleAPIKey = 'AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0'; // Google Geocoding Key

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

async function getLocationData(req = false) {
    let latitude = req.query.lat || 30.601389;
    let longitude = req.query.lng || -96.314445;

    const getLocationData = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            latlng: `${latitude},${longitude}`,
            key: googleAPIKey
        }
    });
    const response = await getLocationData.get();
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

async function getORICrimeData(ori, startDate, endDate) {

    const getORICrimeData = axios.create({
        // Gets summarized crime data
        baseURL: `https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/${ori}/offenses/${startDate}/${endDate}`,
        params: {
            API_KEY: fbiAPIKey
        }
    });

    const response = await getORICrimeData.get("");
    let data = response.data;

    return data;
}

async function getNationalCrimeData(startDate, endDate) {

    const getNationalCrimeData = axios.create({
        // Gets national crime data
        baseURL: `https://api.usa.gov/crime/fbi/sapi/api/estimates/national/${startDate}/${endDate}`,
        params: {
            API_KEY: fbiAPIKey
        }
    });

    const response = await getNationalCrimeData.get("");
    let data = response.data;

    return data;
}

router.get('/', async (req, res) => {
    
    let locationInfo = await getLocationData(req); // gets the county location

    let fbiORI = await getORIData(); // gets all of the ORI data

    let county = locationInfo['county'];

    // Allows for counties to be compared (removes unneeded info)
    county = county.replace('County', '');
    county = county.trim();
    county = county.toUpperCase();

    let state = locationInfo['state'];

    let oriResults = [];

    // This will find ORI's depending on the county
    // Cache the FBI ORI data later

    for (const [key, value] of Object.entries(fbiORI[state])) {
        if (fbiORI[state][key]['county_name'] == county) {
            let oriString = String(fbiORI[state][key]['ori']);
            oriResults.push({"ori": oriString, "latitude": fbiORI[state][key]['latitude'], "longitude": fbiORI[state][key]['longitude'],
            "station_name": fbiORI[state][key]['agency_name']});
        }
    }

    // FINDS THE CLOSEST ORI 
    let magnitude = 1000000; // not the ideal way, but should work
    let tempMagnitude = 0;
    let closestORI = "";
    let closestStationName = "";

    for (let i = 0; i < oriResults.length; ++i) {
        let oriLat = oriResults[i]['latitude'];
        let oriLang = oriResults[i]['longitude'];
        tempMagnitude = Math.pow(oriLat, 2) + Math.pow(oriLang, 2);
        if (tempMagnitude <= magnitude) {
            magnitude = tempMagnitude;
            closestORI = oriResults[i]['ori'];
            closestStationName = oriResults[i]['station_name'];
        }
    }

    console.log(closestORI);

    let startDate = 2010;
    let endDate = 2020;

    //----------------------- CRIME DATA RELATED TO ORI -----------------------//
    // Gets the crime data for each year and splits them into crime categories
    let crimeData = await getORICrimeData(closestORI, startDate, endDate); // response is a JSON file

    let summarizedData = {};

    // Creates an array to hold crime data in it
    // There's a lot more data from previous years
    for (let i = 2010; i < 2021; ++i) {
        summarizedData[i] = 0;
    }

    for (let i = 0; i < crimeData['results'].length; ++i) {
        summarizedData[crimeData['results'][i]['data_year']] += crimeData['results'][i]['actual'];
    }

    /*
    summarizedData returns the following:
    {
        2010: crime_amount,
        2011: crime_amount,
        year: numOfCrimes,
        ...: ...,
        crime_rate_change: percentage change from 2019-2020
    }
    */

    //----------------------- CRIME DATA RELATED TO NATIONAL -----------------------//
    let nationalCrimeData = await getNationalCrimeData(startDate, endDate);

    // Will return the following information
    /*
    {
        "state_id": stuff,
        ...: ...,
        "year": number
        "population": number

    }
    */
    
    // Calculates the change in crime from 2019 to 2020
    crimePercentage = ((summarizedData['2020'] - summarizedData['2019']) / summarizedData['2019']) * 100;
    crimePercentage = Math.round(crimePercentage * 100) / 100;

    summarizedData['crime_rate_change'] = crimePercentage;
    summarizedData['station_name'] = closestStationName;

    // console.log(crimePercentage);

    res.json(
        summarizedData
    )
})

module.exports = router;