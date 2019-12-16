//+ Require the flight schema (models)
   const Flight = require("../models/modelsFlight");
   
//+ Embedded Arrival Object
function create (req, res) {
   let date = req.body.arrivalDate;
   let time = req.body.arrivalTime;
   let newDate = new Date(`${parseInt(date.slice(0,4))}-${date.slice(5,7)}-${date.slice(8,10)}T${time}`);
   let newArrival = {
      airport: req.body.airport,
      arrival: newDate,
   }
   Flight.findById(req.params.id, function(err, flight) {
      flight.destination.push(newArrival);
      flight.save(function(err) {
         res.redirect(`/flights/${flight._id}`);
      });
   });
};

//+ Export the methods
   module.exports = {
      create
   }