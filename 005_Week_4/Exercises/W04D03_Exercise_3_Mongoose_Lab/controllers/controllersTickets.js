//+ Require the flight schema (models)
   const Ticket = require("../models/modelsTicket");
   const Flight = require("../models/modelsFlight");

   function create (req, res) {
      console.log(req.body);
   };

   function show (req, res) {
      Flight.findById(req.params.id, function(err, flight) {
         Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render("tickets/new", {
               tickets: tickets,
               flightId: flight._id,
               title: `${flight.from} to ${flight.flightNo}`
            });
         });
      });
   };

   module.exports = {
      create,
      show
   };