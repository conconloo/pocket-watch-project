const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0';

async function getPlacesList (req = false) {

    let latitude = req.query.latitude || 30.601389;
    let longitude = req.query.longitude || -96.314445;
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=police&key=${apiKey}
    
    const getPlaceData = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        params: {
            location: `${latitude},${longitude}`,
            radius: '5000',
            type: 'police',
            key: apiKey
        }
    });

    const response = await getPlaceData.get();
    
    return response.data.results;
}

router.get('/', async (req, res) => {
    places = await getPlacesList(req);
    console.log(places);
    res.json(places);
})

module.exports = router;