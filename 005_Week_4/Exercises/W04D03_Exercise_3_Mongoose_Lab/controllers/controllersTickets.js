//+ Require the flight schema (models)
   const Ticket = require("../models/modelsTicket");
   const Flight = require("../models/modelsFlight");

   function create (req, res) {
      console.log(req.body);
   };

   function show (req, res) {
      console.log('From : ' + req.params.id);
      console.log('To : '   + req.params.destinationId)
      let airportDest = '';
      Flight.findById({_id: req.params.id}).where("destination").exec(function (err, flightDest) {
         //+ Get the airport destination
            for (let i = 0 ; i < flightDest.destination.length ; i++) {
               if (`${flightDest.destination[i]._id}` === `${req.params.destinationId}`) {
                  airportDest = flightDest.destination[i].airport;
                  break;
               }
            }
         //+ Get the airport destination - Samething using a forEach
            // flightDest.destination.forEach((dest) => {
            //    if (`${dest.id}` === `${req.params.destinationId}`) {
            //       airportDest = dest.airport;
            //    }
            // });
         Ticket.find({flight: req.params._id}, function(err, tickets) {
            res.render("tickets/new", {
               tickets: tickets,
               originFlightId: req.params.id,
               destinationFlightId: req.params.destinationId,
               title: `${flightDest.airport} to ${airportDest}`
            });
         });
      });
   };

   module.exports = {
      create,
      show
   };