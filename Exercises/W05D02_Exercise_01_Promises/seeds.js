//! Utility to initialize database
   require('./config/database');
   const Movie = require('./models/movie');
   const Performer = require('./models/performer');
   const data = require('./data');

//! Delete many with promise
   const p1 = Movie.deleteMany({});
   const p2 = Performer.deleteMany({});

   Promise.all([p1, p2])                              //+ Delete Movie and Performes at the same time
   .then( (results) => {
      console.log(results);                              //- Console.log what have been deleted
      const p3 = Performer.create(data.performers);
      const p4 = Movie.create(data.movies);
      return Promise.all([p3, p4]);                   //+ Create Performes and Movie at the same time
   })
   .then((results) => {
      console.log(results);
      return Promise.all([Performer.findOne({name: 'Mark Hamill'}), Movie.findOne({title: 'Star Wars - A New Hope'})]);
   })
   .then((results) => {
      const mark = results[0];
      const starWars = results[1];
      starWars.cast.push(mark);
      return starWars.save();
   })
   .then(() => {
      process.exit();
   });
