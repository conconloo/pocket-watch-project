const express = require('express');
const router = express.Router();
const csv = require('@fast-csv/parse')
const fs = require('fs');
const { exit } = require('process');
const { resolveObjectURL } = require('buffer');


/*
Things to parse:
1.) offense count
2.) latitude
3.) longitude
*/

function getPolygons() {
    let Count = 16
    let ParentPolygon = [
        {lat: 30.118713, lng: -95.812735 }, // Top Left
        {lat: 30.118713, lng: -95.034621 }, // Top Right
        {lat: 29.49764, lng:  -95.034621}, // Bottom Right
        {lat: 29.49764, lng: -95.812735 } // Bottom Left
    ]

    length = Math.abs(30.11873 - 29.49764)
    width = Math.abs(-95.812735 + 95.034621)

    length_cut = length/Math.sqrt(Count)
    width_cut = width/Math.sqrt(Count)

    let result = []
    let point = ParentPolygon[0] // Start at top left of Parent Polygon
    for(let j = 0; j < Math.sqrt(Count); j++){
        let FindNewChild = true;
        let FirstChildBottomLeft = {lat: 0, lng: 0}
        for(let i = 0; i < Math.sqrt(Count); i++ ){
            
            let ChildPolygon = [
                {lat: point.lat, lng: point.lng  }, //Top left
                {lat: point.lat, lng: point.lng + width_cut}, //Top Right
                {lat: point.lat - length_cut, lng: point.lng + width_cut},  //Bottom Right
                {lat: point.lat - length_cut, lng: point.lng} //Bottom Left
            ]
            if(FindNewChild){
                FirstChildBottomLeft = ChildPolygon[3]
                FindNewChild = false;
            }

            if(i === Math.sqrt(Count) - 1){
                point = FirstChildBottomLeft
                FindNewChild = true;
            } else
            {
                point = ChildPolygon[1]
            }       

            result.push({mag: 0, square: ChildPolygon})
        }

    }

    return result;


}

function getParsedData(file, options) {
    return new Promise((resolve, reject) => {
        const data = [];

        csv
            .parseFile(file, options)
            .on("error", reject)
            .on("data", (row) => {
                data.push(row);
            })
            .on("end", () => {
                resolve(data);
            });
    });
}

async function determineBounds(data) {
    let polygons = getPolygons();

    // let point = ({lng: parseFloat(data.lat), lat: parseFloat(data.lng), mag: parseFloat(data.mag)})
    for (let i = 0; i < 14; ++i) {
        let top = polygons[i].square[0].lat;
        let bottom = polygons[i].square[2].lat;
        let left = polygons[i].square[0].lng;
        let right = polygons[i].square[2].lng;
        
        // console.log("top ", top);
        // console.log("bottom ", bottom);
        // console.log("left ", left);
        // console.log("right ", right);

        for (let j = 0; j < data.length; ++j) {
            if ((top >= data[j]['lat']) && (data[j]['lat'] >= bottom)) {
                if (left <= right && left <= data[j]['lng'] && data[j]['lng'] <= right) {
                    polygons[i].mag += parseFloat(data[j].mag);
                } else if (left > right && (left <= data[j]['lng'] || data[j]['lng'] <= right)) {
                    polygons[i].mag += parseFloat(data[j].mag);
                }
            }
        }
    }
    return polygons;
}

router.get('/', async (req, res) => {
    let file = '../server/datafiles/NIBRSPublicViewJan-Mar22.csv' // hard coded file & file directory
    const data = await getParsedData(
        file, 
        {headers: true})
    let polygons = await determineBounds(data);
    console.log("To the front-end: ", polygons);
    res.json(polygons);
})

module.exports = router;
