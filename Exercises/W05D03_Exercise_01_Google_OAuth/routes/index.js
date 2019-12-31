const express = require('express');
const router = express.Router();
const passport = require('passport');                          //! Require passport package

router.get('/', function(req, res) {                           //! Render our only view
  res.redirect('/students');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { 
     scope: ['profile', 'email'] 
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/students',
    failureRedirect : '/students'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/students');
});

module.exports = router;
