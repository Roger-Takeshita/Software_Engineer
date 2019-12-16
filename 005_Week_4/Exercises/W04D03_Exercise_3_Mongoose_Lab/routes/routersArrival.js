//+ Require packages
   const express = require("express");
   const router = express.Router();
   const arrivalsCtrl = require("../controllers/controllersArrivals");

//+ Router that references the controllers to execute an action/render a page
   router.post("/flights/:id/arrivals", arrivalsCtrl.create);

//+ Export flights router to the server.js
   module.exports = router;