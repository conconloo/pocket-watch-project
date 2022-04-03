
let APIkey = '207a527a4d31d2de8a7264f13e8ad6a2';

let lat = 30.6280; // test values for now
let lon = -96.3344; // test values for now
let unit = 'imperial'; // changes from Kelvin to Fahrenheit

// ideally we should use this function to get a users latitude and longitude
// *MOBILE*: Not sure if this works in mobile, but it might

function getLocation() {
    let coordinates;
    if (navigator.geolocation) {
        coordinates = navigator.geolocation.getCurrentPosition();
    } else {
        console.log("Something went wrong!");
    }
    console.log(coordinates.latitude); // prints latitude
    console.log(coordinates.longitude); // print longitude
}

//getLocation();

// const axios = require('axios').get('*insert link*', {
//     headers: {
//         token: apiToken
//     }
// }).then((response) => {
//     console.log(response.data);
// })

let requestLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${unit}`

const axios = require('axios').get(requestLink)
    .then((response) => {
        console.log(response.data);
    })
