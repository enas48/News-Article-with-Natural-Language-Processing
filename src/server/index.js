//environment variable
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const aylien = require('aylien_textapi');

// set aylien API credentias
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
const app = express();

app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('dist'));

//console.log(JSON.stringify(mockAPIResponse));

app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve('src/client/views/index.html'));
});

// call api
app.post('/api', (req, res) => {
  textapi.sentiment(
    {
      url: req.body.formUrl,
      mode: 'document'
    },
    function(error, response) {
      if (error === null) {
        console.log(response);
        res.send(response);
      } else {
        console.log(error);
      }
    }
  );
});
// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log('Example app listening on port 8081!');
});
