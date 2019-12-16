//+ Require packages
   const mongoose = require("mongoose");     //- Require mongoose packages
   const Schema = mongoose.Schema;           //- Shorthand for mongoose schema

//+ Destination Schema
   let destinationSchema = new Schema (
      {
         airport: {
            type: String,
            enum: ["AUS", "DAL", "LAX", "SEA"]
         },
         arrival: {
            type: Date
         }
      },
      {
         timestamps: true
      }
   );

//+ Flight schema
   let flightSchema = new Schema (
      {
         airLine: {
            type: String,
            enum: ["American", "Southwest", "United"]
         },
         flightNo: {
            type: Number,
            min: 10,
            max: 9999,
            required: true
         },
         gate: {
            type: String,
            enum: ["A", "B", "C", "D", "E", "F", "G"]
         },
         from: {
            type: String,
            enum: ["Toronto"]
         },
         to: {
            type: String,
            enum: ["Ottawa", "Edmonton", "Victoria", "Winnipeg", "Fredericton", "St. John's", "Halifax", "Charlottetown", "Quebec City", "Regina", "Yellowknife", "Iqaluit", "Whitehorse"]
         },
         departs: {
            type: Date,
            default: function() {
               let date = new Date();
               return Date(date.getFullYear()+1, date.getMonth(), date.getDate());
            }
         },
         status: {
            type: String,
            enum: ["Scheduled", "Confirmed", "On Time", "Delayed", "Cancelled", "Boarding", "Done"]
         },
         airport: {
            type: String,
            enum: ["AUS", "DAL", "LAX", "SEA"],
            default: "SEA"
         },
         destination: [destinationSchema]
      },
      {
         timestamps: true
      }
   );

//+ Compile the schema into a model and export it
   module.exports = mongoose.model("Flight", flightSchema);