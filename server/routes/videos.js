// figure out a way to always get axios on launch
const express = require('express');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();

let apiKey = 'AIzaSyCKCEMgiaLWZNfcMVsDwnVGf8qbkKN2s_g' // remove this before pushing

// actually get API data stuff

/*
    To get important video info:

    title: response.data.items[index].snippet.title
    description: response.data.items[index].snippet.description
    thumbnail: response.data.items[index].snippet.thumbnails
    channelTitle: response.data.items[index].snippet.channelTitle
    videoID: response.data.items[index].id.videoId
*/

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
    dataArray = new Array();
    dataArray = await getYouTubeData(req);
    res.json(dataArray);
})

module.exports = router;