//! Require Packages
   const mongoose = require('mongoose');

//! Connct the database.js to a collections named 'Pupies'
   mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });

//! Shorthand to mongoose.connection object
   const db = mongoose.connection;

//! Check connection
   db.on('connected', function() {
      console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
   });