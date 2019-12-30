//! Require Packages
   const express = require('express');
   const router = express.Router();

//! Require Puppies Router
   const puppiesRouter = require('./puppyAPIRouter');

//! API middleware
   router.use('/puppies', puppiesRouter);

//! Export to Server.js
   module.exports = router;