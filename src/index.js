var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var SERVER_PORT = process.env.SERVER_PORT || 8000;
var MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'localhost';
var MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
var MONGO_DB_URL = 'mongodb://' + MONGO_DB_NAME + ':' + MONGO_DB_PORT;

//will be initialized later!
var databaseConnection = undefined;

app.get('/', function (req, res) {
  databaseConnection.collection('quotes').find().toArray(
      function (err, result) {
        if (err) {
          return console.log(err);
        }
        // renders index.ejs
        res.render('index.ejs', {quotes: result});
      })
});

app.post('/quotes', function (req, res) {
  console.log(req.body);
  databaseConnection.collection('quotes').save(req.body,
      function (err, result) {
        if (err) {
          return console.log(err);
        }
        console.log('saved to database');
        res.redirect('/');
      })
});

MongoClient.connect(MONGO_DB_URL, {useNewUrlParser: true},
    function (err, client) {
      console.log('Try to connect to: ' + MONGO_DB_URL);
      if (err) {
        return console.error(err);
      }
      databaseConnection = client.db('my-quotes');
      app.listen(SERVER_PORT, function () {
        console.log('Example app listening on port ' + SERVER_PORT + '!');
        console.log('http://localhost:' + SERVER_PORT);
      });
    });
