const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0';

// Invalid request right now?
async function getPlacesList () {
    let latitude = 30.6280;
    let longitude = -96.3344;

    const getPlaceData = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        params: {
            location: `${latitude}, ${longitude}`, // ',' doesn't become %2C :(
            keyword: 'hospital',
            type: 'hospital', // hospital, pharmacy, doctor, etc.
            key: apiKey // API key
        }
    });

    const response = await getPlaceData.get();
    
    return response;
}

router.get('/', async (req, res) => {
    places = await getPlacesList();
    console.log(places);
})

module.exports = router;