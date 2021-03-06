
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();
const {User} = require('./users/models');
const flash = require('express-flash');

app.engine('.hbs', expHbs({
  extname: '.hbs',
  partialsDir: 'views/partials/'
}));
app.set('view engine', '.hbs');

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
// app.use(function(req, res, next){
//     // if there's a flash message in the session request, make it available in the response, then delete it
//     res.locals.sessionFlash = req.session.sessionFlash;
//     delete req.session.sessionFlash;
//     next();
// });

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
const { router: pagesRouter } = require('./pagesRouter');
const { router: gamesRouter } = require('./games')
mongoose.Promise = global.Promise;

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // sending it to everybody
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

app.use('/api/games/', gamesRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/', pagesRouter);

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