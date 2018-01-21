const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(bodyParser.json());


router.get('/', function(req, res) {
	res.render('pages/index', { title: 'Welcome'});
});

// router.get('/list', jwtAuth, function(req, res) {
router.get('/list', function(req, res) {
	res.render('pages/gameList', { title: 'Game List'});
  // res.sendFile(path.join(__dirname, '/public/html', 'gameList.html'));
  // // check if the sendfile works
  // res.status(200);
});

// router.get('/game/:id', jwtAuth, function(req, res) {
router.get('/game/:id', function(req, res) {
  // create function to get the game id and merge into the template html and send the content back
  
  res.render('pages/game', { title: 'Game'});
  // res.sendFile(path.join(__dirname, '/public/html', 'game.html'));
  // // req.params.id
  // // check if the sendfile works
  // res.status(200);
});







module.exports = {router};