//! Require Packages
const express = require('express');
const router = express.Router();

//! Require Puppies Router
const moviesRouter = require('./moviesAPIRouter');

//! API middleware
router.use('/movies', moviesRouter);

//! Export to Server.js
module.exports = router;