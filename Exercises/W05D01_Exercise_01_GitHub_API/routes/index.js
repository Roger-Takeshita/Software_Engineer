//! Require Packages
   const express   = require('express');
   const router    = express.Router();
   const indexCtrl = require('../controllers/indexController');

//! Router
   router.get ('/', indexCtrl.index);
   router.post('/', indexCtrl.getUser);

//! Exports Router to server.js
   module.exports = router;
