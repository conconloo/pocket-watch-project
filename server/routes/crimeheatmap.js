const express = require('express');
const router = express.Router();
const csv = require('csv-parser')
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


async function getParsedData() {
    let results = await getPolygons();
    let file = '../server/datafiles/NIBRSPublicViewJan-Mar22.csv' // hard coded file & file directory

    await fs.createReadStream(file)
        .pipe(csv({mapValues: ({value}) => parseFloat(value)}))
        .on('data', (data) => {
            if(data.lat && data.lng && data.mag) { // check if a latitude and longitude exist
            
                let point = ({lng: parseFloat(data.lat), lat: parseFloat(data.lng), mag: parseFloat(data.mag)})
                results.forEach(polygon => {
                    let TopLeft = polygon.square[0]
                    let BottomRight = polygon.square[2]

                    //Something is wrong with this statement
                    
                    if(point.lat < TopLeft.lat && point.lng > TopLeft.lng){
                        if(point.lat > BottomRight.lat && point.lng < BottomRight.lng){
                            //console.log("Top Left:" + TopLeft.lat + ", " + TopLeft.lng, "Point: "+ point.lat + ", " + point.lng)
                            //console.log("Bottom Right:" + BottomRight.lat + ", " + BottomRight.lng, "Point: "+ point.lat + ", " + point.lng)
                            //console.log("point Magnitude: ", point.mag, "Polygon mag: ", polygon.mag)

                            polygon.mag += point.mag
                        } 
                    }
                })

            }
        })
        .on('end', () => {
        console.log("What should go to Front-end", results); // check to see if the results are correct
       
    }); 

    return results;
}

router.get('/', async (req, res) => {
    await getParsedData()
    .then(results => {
        console.log("To Front-end" , results)
        res.json(results)
    })
})

module.exports = router;
