//+ Require packages
   const express = require('express');
   const router = express.Router();
   const flightsCtrl = require("../controllers/controllersFlights");

//+ Router that references the controllers to execute an action/render a page
   router.get("/", flightsCtrl.index);       //- URL Request to 3000/flights -> Index page
   router.get("/new", flightsCtrl.new);      //- URL Request to 3000/flights/new -> New Page
   router.get("/:id", flightsCtrl.show);     //- URL Request
   router.post("/", flightsCtrl.create);     //- URL Post    to 3000/flights -> Post Page

//+ Export flights router to the server.js
   module.exports = router;
