
import axios from "axios";

// constant values
let apiKey = '207a527a4d31d2de8a7264f13e8ad6a2';
let units = 'imperial';

let arr = [];

// function that returns the position of the current device
function getPosition() {
    return new Promise((res, rej) => {
       navigator.geolocation.getCurrentPosition(res, rej);
    });
}

// function that returns all of the json data from the weather API
export const getAllWeatherData = async () => {
    let locationData = await getPosition();

    if (locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=${units}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getWeatherCity = async () => {
    let locationData = await getPosition();

    if (locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=${units}`)
            .then(response => {
                // push the key & value to the array for parsing to JSON later
                arr.push("City", response.data.name);
                return response.data.name;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getWeatherTime = async () => {
    let locationData = await getPosition();

    if (locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=${units}`)
            .then(response => {
                // push the key & value to the array for parsing to JSON later
                arr.push("Time", response.data.dt);
                return response.data.dt;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getWeatherTemp = async () => {
    let locationData = await getPosition();

    if (locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=${units}`)
            .then(response => {
                // push the key & value to the array for parsing to JSON later
                arr.push("Temperature", response.data.main.temp);
                return response.data.main.temp;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// Precipitation chances range from 0 to 1 (0% to 100%)
export const getWeatherRain = async () => {
    let locationData = await getPosition();

    if (locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=${units}`)
            .then(response => {
                // push the key & value to the array for parsing to JSON later
                arr.push("Precipitation", response.data.hourly[0].pop);
                return response.data.hourly[0].pop;
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function compileJson(){
    let myJSON = [];
    arr.forEach(function (v, i, a) {
        if(i % 2) {
            myJSON[a[i-1]] = v;
        }
    });
    //myJSON = JSON.stringify(arr);
    return myJSON;
}

/* Code used to test to see if the functions return the desired data */

export function main() {
    getAllWeatherData().then(console.log);
    getWeatherCity().then(console.log);
    getWeatherTime().then(console.log);
    getWeatherRain().then(console.log);
    getWeatherTemp().then(console.log).then(console.log(compileJson()));
}

main();