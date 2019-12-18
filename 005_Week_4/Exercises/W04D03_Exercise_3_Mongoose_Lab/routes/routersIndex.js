//+ Require packages
   const express = require('express');
   const router = express.Router();

//+ Router that render the index page
   router.get("/", function(req, res, next) {
      res.render('index', { title: 'Home' });
   });

//+ Export skills router to the server.js
   module.exports = router;
