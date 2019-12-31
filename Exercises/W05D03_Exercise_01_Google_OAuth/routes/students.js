const express = require('express');
const router = express.Router();
const studentsCtrl = require('../controllers/students');

router.get('/students', studentsCtrl.index);
router.post('/facts', isLoggedIn, studentsCtrl.addFact);
   //! Take note of the inserted `isLoggedIn` middleware function.
   //+ Our custom `isLoggedIn` middleware function, like all middleware, will either call `next()`, or `respond` to the request.
   //+ Put our new middleware at the very bottom
      function isLoggedIn(req, res, next) {
         if (req.isAuthenticated()) return next();
         res.redirect('/auth/google');
      }

module.exports = router;