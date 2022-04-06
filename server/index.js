const express = require('express');
const app = express();
// const users = require('./routes/users');
const videos = require('./routes/videos');
const weather = require('./routes/weather');

const path = require('path');
const PORT = process.env.PORT || 4000;
// app.use(express.static(path.join(__dirname, 'public'))); // for heroku

// app.use('/api/users', users);

app.use('/api/videos', videos); // for videos

app.use('/api/weather', weather); // for videos

app.get('/api', (req, res) => {
    res.send('hello world from express');
});

app.listen(PORT);