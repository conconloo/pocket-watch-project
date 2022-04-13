// figure out a way to always get axios on launch
const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyCKCEMgiaLWZNfcMVsDwnVGf8qbkKN2s_g'

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
    let fileFound = false; // file has not been found
    
    for (let i = 0; i < currVideos.length; ++i) {
        if (currVideos[i] == (req.query.keyword + '.json')) {
            // If file is already saved, don't run the API, instead load it from the saved ata
            fileFound = true;
            console.log("Video results are already saved, loading...")
            dataArray = JSON.parse(fs.readFileSync(__dirname + '/../json/' + req.query.keyword + '.json'));
            console.log("Done.");
            break;
        }
    }
    
    if (!fileFound) {
        // If the video info has not been saved, then save it and show it
        dataArray = await getYouTubeData(req);
        let ytData = JSON.stringify(dataArray);
        console.log("Video results are not saved, saving...")
        fs.writeFileSync(__dirname + '/../json/' + req.query.keyword + '.json', ytData); // writes to ../json folder in server
        console.log("Done.")
    }

    res.json(dataArray);
})

module.exports = router;