//! Utility to initialize database
   require('./config/database');
   const Movie = require('./models/movie');
   const Performer = require('./models/performer');
   const data = require('./data');

//! Delete many with promise
   const p1 = Movie.deleteMany({});
   const p2 = Performer.deleteMany({});
   
   Promise.all([p1, p2])
   .then( (results) => {
      console.log(results);
   })
   .then( () => {
      process.exit();
   });