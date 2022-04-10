const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyAEZeR4pdli80dwbZNLbly_Da9bG-jk1k0';

// Invalid request right now?
async function getPlacesList () {
    let latitude = 30.601389;
    let longitude = -96.314445;

    // This method doesn't work right now, other one does
    // const getPlaceData = axios.create({
    //     baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    //     params: {
    //         keyword: 'cruise',
    //         location: `${latitude},${longitude}`,
    //         radius: '1500'  ,
    //         type: 'restaurant',
    //         key: 'apiKey'
    //     }
    // });

    // can find nearby police stations
    const getPlaceData = axios.create({
        baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=police&key=${apiKey}`,
        headers: { }
      });

    const response = await getPlaceData.get();
    
    return response.data.results;
}

router.get('/', async (req, res) => {
    places = await getPlacesList();
    console.log(places);
    res.json(places);
})

module.exports = router;