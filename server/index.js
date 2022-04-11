const express = require('express');
const app = express();
const videos = require('./routes/videos');
const weather = require('./routes/weather');
const places = require('./routes/places');
const currWeather = require('./routes/currentweather');

const path = require('path');
const PORT = process.env.PORT || 4000;
//app.use(express.static(path.join(__dirname, 'public'))); // for heroku


app.use('/api/videos', videos); // for videos

app.use('/api/weather', weather);

app.use('/api/currweather', currWeather); // for current weather

app.use('/api/places', places);

app.get('/api', (req, res) => {
    res.send('hello world from express');
});

app.listen(PORT);