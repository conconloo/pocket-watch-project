// figure out a way to always get axios on launch
const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyCKCEMgiaLWZNfcMVsDwnVGf8qbkKN2s_g' // remove this before pushing

// Add like an update parameter check, if an update request is sent then force the update

// actually get API data stuff

async function getYouTubeData (req) {
    let maxResults = 25;
    let searchQuery = req.query.keyword;
    console.log('Searching: ' + searchQuery);

    // Uses Axios to get YouTube API data
    const getYouTubeData = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
            part: 'snippet',
            maxResults: maxResults,
            q: searchQuery,
            key: apiKey
        }
    });

    const response = await getYouTubeData.get('/search')

    let videoItemArray = new Array();

    // Push all API data into a video array
    for (let i = 0; i < maxResults; ++i) {
        videoItemArray.push(response.data.items[i]);
    }

    // Used for the next loop
    let lessDataArray = new Array();
    let currDate = new Date().toISOString(); // gives the JSON a timestamp

    lessDataArray.push({timestamp: currDate});

    // Removes any unneccesary video data
    for (let i = 0; i < videoItemArray.length; ++i) {
        const videoInfo = {
            title: videoItemArray[i].snippet.title,
            description: videoItemArray[i].snippet.description,
            thumbnail: videoItemArray[i].snippet.thumbnails.high,
            channelTitle: videoItemArray[i].snippet.channelTitle,
            videoID: videoItemArray[i].id.videoId
        }
        lessDataArray.push(videoInfo);
    }
    return lessDataArray;
}

router.get('/', async (req, res) => {
    const fs = require('fs');

    let dataArray;
    
    let currVideos = fs.readdirSync(__dirname + '/../json/'); // gets all currently saved video results
    let fileFound = false; // variable for a file not being found
    let fileOutOfDate = false; // variable for if file is out of date
    
    for (let i = 0; i < currVideos.length; ++i) {
        // If file is already saved, don't run the API, instead load it from the saved data
        if (currVideos[i] == (req.query.keyword + '.json')) {
            fileFound = true;
            console.log("Video results are already saved, loading...")
            dataArray = JSON.parse(fs.readFileSync(__dirname + '/../json/' + req.query.keyword + '.json'));
            console.log("Done.");
            break;
        }
    }

    // Timestamp Stuff
    // Please check: Does it actually update cached things after 24 hours? If so, does that break anything?

    if (fileFound) {
        let currentTime = new Date(); // gets the current date

        let oldTime = dataArray[0]; // currently breaks the caching
        let oldDate = new Date(oldTime);
    
        let milliSecDif = Math.abs(currentTime - oldDate);
        let minDif = Math.floor((milliSecDif/1000)/60);
    
        if (minDif >= 1440) {
            console.log("File will be updated as the file is over 24 hours old."); // a day is 1440 minutes
            fileOutOfDate = true;
        } else {
            console.log("File was recently updated under 24 hours ago.")
        }

        dataArray.shift(); // removes timestamp
    }
    
    if (!fileFound) {
        // If the video info has not been saved, then save it and show it
        dataArray = await getYouTubeData(req);
        let ytData = JSON.stringify(dataArray);
        console.log("Video results are not saved, saving...")
        fs.writeFileSync(__dirname + '/../json/' + req.query.keyword + '.json', ytData); // writes to ../json folder in server
        dataArray.shift(); // removes timestamp
        console.log("Done.")
    } else if (fileOutOfDate) {
        // You can probably combine this with the !FileFound part
        dataArray = await getYouTubeData(req);
        let ytData = JSON.stringify(dataArray);
        console.log("Video results are older than 24 hours, re-caching...");
        fs.writeFileSync(__dirname + '/../json/' + req.query.keyword + '.json', ytData); // writes to ../json folder in server
        dataArray.shift(); // removes timestamp
        console.log("Done.")
    }

    res.json(dataArray);
})

module.exports = router;