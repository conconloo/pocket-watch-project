const express = require('express');
const router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')

/*
Things to parse:
1.) offense count
2.) latitude
3.) longitude
*/

const results = []; // store the results in an array
async function getParsedData() {
    let file = '../pocket-watch/server/datafiles/NIBRSPublicViewJan-Mar22.csv' // hard coded file & file directory
    let lat;
    let lng;
    fs.createReadStream(file)
        .pipe(csv({mapValues: ({value}) => parseFloat(value)}))
        .on('data', (data) => {
            if(data.lat && data.lng) { // check if a latitude and longitude exist

                // convert values to float to get into LatLng Object format
                lat = parseFloat(data.lat)
                lng = parseFloat(data.lng)

                results.push({lat: lat, lng: lng}) // push the data to the array
                // results.push(new google.maps.LatLng(lat, lng))
                //TODO: Convert Lat/Lng Literal to just Lat/Lng => HeatMaps don't allow Lat/Lng Literals
            }
        })
        .on('end', () => {
        console.log(results); // check to see if the results are correct
    });
    return results
}

router.get('/', async (req, res) => {
    let data = await getParsedData();
    res.json(data)
})

module.exports = router;
