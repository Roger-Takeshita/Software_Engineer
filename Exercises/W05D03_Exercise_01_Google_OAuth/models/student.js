const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const factSchema = new Schema(
   {
      text: String
   }, 
   {
      timestamps: true
   }
);

const studentSchema = new Schema({
   name: String,
   email: String,
   cohort: String,
   avatar: String,
   facts: [factSchema],
   googleId: String
}, {
   timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
