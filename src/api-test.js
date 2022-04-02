// Testing script for API

let apiToken = "";

const axios = require('axios').get('https://www.ncdc.noaa.gov/cdo-web/api/v2/locations', {
    headers: {
        token: apiToken
    }
}).then((response) => {
    console.log(response.data);
})