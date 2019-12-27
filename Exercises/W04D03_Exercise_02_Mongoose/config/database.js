//!                 ,,                             ,,                                  
//!               `7MM             mm             *MM                                  
//!                 MM             MM              MM                                  
//!            ,M""bMM   ,6"Yb.  mmMMmm   ,6"Yb.   MM,dMMb.   ,6"Yb.  ,pP"Ybd  .gP"Ya  
//!          ,AP    MM  8)   MM    MM    8)   MM   MM    `Mb 8)   MM  8I   `" ,M'   Yb 
//!          8MI    MM   ,pm9MM    MM     ,pm9MM   MM     M8  ,pm9MM  `YMMMa. 8M"""""" 
//!          `Mb    MM  8M   MM    MM    8M   MM   MM.   ,M9 8M   MM  L.   I8 YM.    , 
//!           `Wbmd"MML.`Moo9^Yo.  `Mbmo `Moo9^Yo. P^YbmdP'  `Moo9^Yo.M9mmmP'  `Mbmmd' 


//! Require the mongoose package
   var mongoose  = require("mongoose");

//! Connect the database.js to a database named "movies"
   mongoose.connect("mongodb://localhost/movies", {
      useNewUrlParser: true,  //+ This is a recent option that avoids a deprecation warning.
      useUnifiedTopology: true
   });

//! Shortcut to mongoose.connection object
   let db = mongoose.connection;

//! Add an eventListener just to check if we are connected. It will print the host name and the port
   db.on("connected", function() {
      console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
   })