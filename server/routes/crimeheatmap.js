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

function getPolygons() {
    let Count = 16
    let ParentPolygon = [
        {lat: 30.118713, lng: -95.812735 }, // Top Left
        {lat: 30.118713, lng: -95.034621 }, // Top Right
        {lat: 29.49764, lng: -95.812735 }, // Bottom Right
        {lat: 29.49764, lng: -95.034621 } // Bottom Left
    ]

    length = Math.abs(30.11873 - 29.49764)
    width = Math.abs(-95.812735 + 95.034621)

    length_cut = length/Math.sqrt(Count)
    width_cut = width/Math.sqrt(Count)

    let result = []
    let point = ParentPolygon[0] // Start at top left of Parent Polygon
    let endLng = ParentPolygon[1].lnng
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

            result.push({magnitude: (j+1)*(i+1), square: ChildPolygon})
        }

    }

    return result;


}

const results = []; // store the results in an array
async function getParsedData() {
    let file = '../server/datafiles/NIBRSPublicViewJan-Mar22.csv' // hard coded file & file directory
    let lat;
    let lng; 
    fs.createReadStream(file)
        .pipe(csv({mapValues: ({value}) => parseFloat(value)}))
        .on('data', (data) => {
            if(data.lat && data.lng) { // check if a latitude and longitude exist

                // convert values to float to get into LatLng Object format
                lat = parseFloat(data.lat)
                lng = parseFloat(data.lng)

                /*
                    {
                        {
                            magnitude: 0,
                            square: [
                                {lat: 30, lng: 45},
                                {lat: 30, lng: 55},
                                {lat: 40, lng: 45},
                                {lat: 40, lng: 55}
                            ]
                        },
                        {
                            magnitude: 0,
                            square: {
                                {lat: 30, lng: 45},
                                {lat: 30, lng: 55},
                                {lat: 40, lng: 45},
                                {lat: 40, lng: 55}
                            }
                        },
                        {
                            magnitude: 0,
                            square: {
                                {lat: 30, lng: 45},
                                {lat: 30, lng: 55},
                                {lat: 40, lng: 45},
                                {lat: 40, lng: 55}
                            }
                        }


                    }


                */

                results.push({lat: lat, lng: lng}) // push the data to the array
                //results.push(new google.maps.latLng(lat, lng).toString())
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
    let polygons = getPolygons();
    res.json(polygons)
})

module.exports = router;
