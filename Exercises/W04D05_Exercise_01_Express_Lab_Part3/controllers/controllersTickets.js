//! Require the flight schema (models)
   const Ticket = require("../models/modelsTicket");
   const Flight = require("../models/modelsFlight");

//! Create a new object (ticket)
   function create (req, res) {
      let ticketExistFlag = false;
      Ticket.find({destFlight: req.params.destinationId}).sort({seat: 1}).exec( function(err, tickets) {
         tickets.forEach( (ticket) => {
            console.log(ticket.seat.toString(), req.body.seat);
            if (ticket.seat.toString() === req.body.seat) {
               ticketExistFlag = true;
            }
         });
         if (ticketExistFlag) {
            return res.redirect(`/flights/${req.params.id}/${req.params.destinationId}/seats`);
         } else {
            let newTicket = {
               seat: req.body.seat,
               price: req.body.price,
               destFlight: req.params.destinationId
            }
            let ticket = new Ticket(newTicket);
            ticket.save( (err) => {
               if (err) {
                  console.log(err);
               }
               res.redirect(`/flights/${req.params.id}/${req.params.destinationId}/seats`);
            });
         };
      });
   };

//! Render the show/new tickets
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
         Ticket.find({destFlight: req.params.destinationId}).sort({seat: 1}).exec( function(err, tickets) {
            res.render("tickets/new", {
               tickets: tickets,
               originFlightId: req.params.id,
               destinationFlightId: req.params.destinationId,
               title: `${flightDest.airport} to ${airportDest}`
            });
         });
      });
   };

//! Delete one ticket
   function deleteTicket (req, res) {
      Ticket.deleteOne({_id: req.params.ticketId}, function(err, oneTicket) {
         if (err) {
            console.log(err);
         }
         console.log('One item was deleted: ' + oneTicket);
         res.redirect(`/flights/${req.params.id}/${req.params.destinationId}/seats`);
      })
   };

//! Export the methods   
   module.exports = {
      create,
      show,
      delete: deleteTicket
   };