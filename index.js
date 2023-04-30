require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isUrl = require('is-url');


app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

const urlsDatabase = {};
var currentUrlId = 1;

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
    let url = req.body.url;
    if (!isUrl(url)) {
        res.json({ error: 'invalid url' });
    } else {
        urlsDatabase[currentUrlId] = url;
        res.json({ 'original_url': url, 'short_url': currentUrlId });
        currentUrlId += 1;
        console.log(urlsDatabase)
    }
});

app.get('/api/shorturl/:id', function(req, res) {
    res.redirect(urlsDatabase[req.params.id]);
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});