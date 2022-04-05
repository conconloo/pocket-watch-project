// figure out a way to always get axios on launch
const express = require('express');
const axios = require('axios')
const router = express.Router();

let apiKey = '' // remove this before pushing

// actually get API data stuff
async function getYouTubeData () {
    const getYouTubeData = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
            part: 'snippet',
            maxResults: 25,
            q: 'safety videos',
            key: apiKey
        }
    });

    const response = await getYouTubeData.get('/search')
    console.log(response.data.items[0]) // works!

    // So basically return an array with all of the response data items

    // so response.data.items[index].snippet has title, description, thumbnails, and even the uploader's channel title
    // response.data.items[index].id.videoId has the actual video link once you prepend youtube.com/watch?v=
}

getYouTubeData();

// returns stuff to the front end if requested?

// router.get('/', (req, res) => {

// })