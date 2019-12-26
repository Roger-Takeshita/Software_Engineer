//+ Require packages
   const mongoose = require("mongoose");     //- Require mongoose packages
   const Schema = mongoose.Schema;           //- Shorthand for mongoose schema

//+ Tickets Schema
   let ticketsSchema = new Schema(
      {
         seat: {
            type: [String],
            match: /[A-F][1-9]\d?/,
            required: true
         },
         price: {
            type: [Number],
            min: 0,
            required: true
         },
         destFlight: {
            type: Schema.Types.ObjectId,
            ref: 'Flight' 
         }
      }
   );

//+ Compile the schema into a model and export it
   module.exports = mongoose.model("Ticket", ticketsSchema);