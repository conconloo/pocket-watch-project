const express = require('express');
const app = express();
const users = require('./routes/users');
const videos = require('./routes/videos')


app.use('/api/users', users);

app.get('/api', (req, res) => {
    res.send('hello world from express');
});

app.listen(4000);