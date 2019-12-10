const express = require('express');
const router = express.Router();
const skillsCtrl = require('../controllers/skills');

/* GET users listing. */
//! Router that reference the controllers
router.get("/", skillsCtrl.index);     //+ It's only "/" beacuse we already declared on the server app.use('/skills', skillsRouter); 
router.get("/:id", skillsCtrl.show);   //+ ADD the id that I am calling

module.exports = router;
