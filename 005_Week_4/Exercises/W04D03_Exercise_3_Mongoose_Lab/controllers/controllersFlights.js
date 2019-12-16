//+ Require the flight schema (models)
   const Flight = require("../models/modelsFlight");

//+ Render the index
   function index (req, res) {
      Flight.find({}).sort({departs: 1}).exec(function(err, flight) {
         res.render("flights/index", {
            flights: flight,
            title : "Departing Flights"
         });
      });
   };

//+ Render the Show
   function show (req, res) {
      Flight.findById({_id: req.params.id}).exec(function(err, flightOne) {
         res.render("flights/show", {
            flight: flightOne,
            title: "Show One Flight"
         });
      });
   };

//+ Render the new
   function newFlight (req, res) {
      res.render("flights/new", {
         title: "Add a New Flight"
      });
   };

//+ Create new object
   function create (req, res) {
      let date = req.body.flightDate;
      let time = req.body.flightTime;
      let newDate = new Date(`${parseInt(date.slice(0,4))}-${date.slice(5,7)}-${date.slice(8,10)}T${time}`);
      let newFlight = {
         airLine: req.body.airLine,
         flightNo: req.body.flightNo,
         gate: req.body.gate,
         from: req.body.from,
         to: req.body.to,
         departs: newDate,
         status: req.body.status
      }
      let flight = new Flight (newFlight);
      flight.save((err)=>{
         if (err) {
            console.log(err);
            return res.render("flights/new")
         }
         console.log(flight);
         res.redirect("/flights")
      })
   };

//+ Export the methods
   module.exports = {
      index,
      new: newFlight,
      create,
      show
   }