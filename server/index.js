const express = require('express');
const app = express();
const videos = require('./routes/videos');
const weather = require('./routes/weather');

app.use('/api/videos', videos); // for videos

app.use('/api/weather', weather); // for videos

app.get('/api', (req, res) => {
    res.send('hello world from express');
});

app.listen(4000);