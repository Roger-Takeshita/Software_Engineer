//+ Require packages
   const mongoose = require("mongoose");

//+ Connect the database.js to a database names "flights"
   mongoose.connect("mongodb://localhost/flights", {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });

//+ Shorhand to mongoose.connection object
   const db = mongoose.connection;

//+ Check connection
   db.on("connected", function() {
      console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
   })