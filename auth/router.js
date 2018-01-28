const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local');
router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const user = req.user.apiRepr();
  const authToken = createAuthToken(user);
  req.session.jwt = authToken;
// This should redirect the user to the game list
  res.send({redirect: '/list'});
  // res.json({authToken, user});
});

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/login'); 
  });
});

const jwtAuth = passport.authenticate('jwt');

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});



module.exports = {router};
