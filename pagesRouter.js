const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(bodyParser.json());


// router.get('/', function(req, res) {
//   req.flash('success', 'Welcom!');

// 	res.render('pages/index', { title: 'Welcome', message: req.flash('success')});
// });

router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Welcome'})
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.get('/signup', function(req, res) {
  res.render('pages/signup');
});

// router.get('/list', jwtAuth, function(req, res) {
router.get('/list', ensureLogin.ensureLoggedIn('/'), function(req, res) {
  console.log(req.user);
	res.render('pages/gameList', { title: 'Game List', login: true});
  // res.sendFile(path.join(__dirname, '/public/html', 'gameList.html'));
  // // check if the sendfile works
  // res.status(200);
});

router.get('/game', ensureLogin.ensureLoggedIn('/'),function(req, res) {
  res.render('pages/game', { title: 'New Game', login: true});
});

// router.get('/game/:id', jwtAuth, function(req, res) {
router.get('/game/:id', ensureLogin.ensureLoggedIn('/'),function(req, res) {
  // create function to get the game id and merge into the template html and send the content back
  
  res.render('pages/game', { title: 'Game', login: true});
  // res.sendFile(path.join(__dirname, '/public/html', 'game.html'));
  // // req.params.id
  // // check if the sendfile works
  // res.status(200);
});



// // Route that creates a flash message using the express-flash module
// app.all('/express-flash', function( req, res ) {
//     req.flash('success', 'This is a flash message using the express-flash module.');
//     res.redirect(301, '/');
// });

// // Route that creates a flash message using custom middleware
// app.all('/session-flash', function( req, res ) {
//     req.session.sessionFlash = {
//         type: 'success',
//         message: 'This is a flash message using custom middleware and express-session.'
//     }
//     res.redirect(301, '/');
// });

// // Route that incorporates flash messages from either req.flash(type) or res.locals.flash
// app.get('/', function( req, res ) {
//     res.render('index', { expressFlash: req.flash('success'), sessionFlash: res.locals.sessionFlash });
// });





module.exports = {router};