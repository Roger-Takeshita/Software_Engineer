//+ Require packages
   const express = require('express');
   const router = express.Router();
   const flightsCtrl = require("../controllers/controllersFlights");

//+ Router that references the controllers to execute an action/render a page
   router.get("/", flightsCtrl.index);             //- URL GET Request  -> Will mount the "Index Page" on 3000/flights
   router.get("/new", flightsCtrl.new);            //- URL GET Request  -> Will mount the "New Flight" on 3000/flights/new
   router.get("/:id", flightsCtrl.show);           //- URL GET Request  -> Will mount the "Show Page"  on 3000/flights/_id
   router.post("/", flightsCtrl.create);           //- URL POST Request -> Will post the request on the "Index Page"

//+ Export flights router to the server.js
   module.exports = router;
