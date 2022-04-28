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
    let file = '../server/datafiles/NIBRSPublicViewJan-Mar22.csv' // hard coded file & file directory
    fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => {
            if(data.MapLatitude !== '' || data.MapLongitude !== '') { // check if a latitude and longitude exist
                results.push(data) // push the data to the array
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
