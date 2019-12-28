//! Require Packages
   const express = require('express');
   const router = express.Router();
   const requestLib = require('request');          //+ We changed the name of the variable to requestLib to avoid mistakes

//! Shorthand
   const rootURL = 'https://api.github.com/';
   const token = process.env.GITHUB_TOKEN;

//! Render Index File
   function index (req, res) {
      res.render('index', {
         title: 'GitHub User',
         userData: null
      })
   };

//! Render Post Request User
   function getUser (req, res) {
      let options = {
         url: `${rootURL}users/${req.body.username}`,
         headers: {
            'User-Agent': req.body.username,
            Authorization: 'token ' + token
         }
      };
      requestLib(options, function(err, response, body) {
         const userData = JSON.parse(body);
         options.url = userData.repos_url;
         requestLib(options, function(err, response, body) {
            userData.repos = JSON.parse(body)
            res.render('index', {
               title: `GitHub: ${req.body.username}`,
               userData
            });
         });
      });
   };

//! Exports modules to routes
   module.exports = {
      index,
      getUser
   }