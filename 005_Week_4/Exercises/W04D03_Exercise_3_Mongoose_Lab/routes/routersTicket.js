//+ Require packages
   const express = require('express');
   const router = express.Router();
   const ticketsCtrl = require("../controllers/controllersTickets");

//+ Router that references the controllers to execute an action/render a page
   router.get('/:id/:destinationId/seats', ticketsCtrl.show);
   router.post("/:id/seats", ticketsCtrl.create);

//+ Export flights router to the server.js
   module.exports = router;