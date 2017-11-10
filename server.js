const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();

const {DATABASE_URL, PORT} = require('./config');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Bypass favicon rendering for now
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html', 'index.html'));
  res.status(200);
});

app.get('/list/game', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html', 'gameList.html'));
  // check if the sendfile works
  res.status(200);
});

app.get('/game/:id', function(req, res) {
  // create function to get the game id and merge into the template html and send the content back
  res.sendFile(path.join(__dirname, '/public', 'game.html'));
  // req.params.id
  // check if the sendfile works
  res.status(200);
});

// app.get('/', function(req, res) {
//   res.status(200);
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};