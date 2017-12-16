
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const app = express();
const {User} = require('./users/models');

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const {DATABASE_URL, PORT} = require('./config');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// Here we use destructuring assignment with renaming so the two variables
// called router (from ./users and ./auth) have different names
// For example:
// const actorSurnames = { james: "Stewart", robert: "De Niro" };
// const { james: jimmy, robert: bobby } = actorSurnames;
// console.log(jimmy); // Stewart - the variable name is jimmy, not james
// console.log(bobby); // De Niro - the variable name is bobby, not robert
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', require('connect-ensure-login').ensureLoggedIn('/'), (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

// app.use('*', (req, res) => {
//   return res.status(404).json({ message: 'Not Found' });
// });

// Bypass favicon rendering for now
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html', 'index.html'));
  res.status(200);
});

app.get('/list/game', jwtAuth, function(req, res) {
  res.sendFile(path.join(__dirname, '/public/html', 'gameList.html'));
  // check if the sendfile works
  res.status(200);
});

app.get('/game/:id', jwtAuth, function(req, res) {
  // create function to get the game id and merge into the template html and send the content back
  

  res.sendFile(path.join(__dirname, '/public/html', 'game.html'));
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