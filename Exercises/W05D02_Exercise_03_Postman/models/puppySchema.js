//! Require Packages
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

//! Pupies Schema
   let puppySchema = new Schema(
      {
         name: {
            type: String,
            required: true
         },
         breed: {
            type: String,
            default: 'Mixed'
         },
         age: {
            type: Number,
            default: 0
         }
      },
      {
         timestamps: true
      }
   );

module.exports = mongoose.model('Puppy', puppySchema, 'puppies');