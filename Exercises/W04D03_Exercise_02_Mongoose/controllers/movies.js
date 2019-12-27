//!                                                                      ,,    ,,                            
//!                                           mm                       `7MM  `7MM                            
//!                                           MM                         MM    MM                            
//!           ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!          6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
//!          8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
//!          YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
//!           YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP' 

//+ Import the movies schema (models)
   let Movie = require('../models/movie');

//+ Render the new.ejs
   function newMovie (req, res) {
      res.render("movies/new")
   }

//+ Render the create
   function create (req, res) {
      //- convert nowShowing's checkbox of nothing or "on" to boolean - Get the input name form our new.ejs
         req.body.nowShowing = !! req.body.nowShowing;
      //- remove whitespace newt to commas
         req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
      //- split if it's not an empty string
         if (req.body.cast) req.body.cast = req.body.cast.split(',');
      //- remove empty properties
         for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
         }
      //- Create a new movie object with the request body
         let movie = new Movie(req.body);
      //- Save the new movie into mongoDB
         movie.save(function(err) {
            //? If you got an error, render the same page ("new") again
               if (err) {
                  console.log(err);
                  return res.render("movies/new");
               }
            //? console.log the form
               console.log(movie);
            //? If you don't an error, it'll just redirect to the movies/index.ejs
               res.redirect("/movies");
         })
   }

//+ Render the index
   function index (req, res) {
      Movie.find({}, function(err, mov) {
         console.log(mov);
         res.render('movies/index', {
            movies: mov
         });
      });
   }

//+ Export the methods
   module.exports = {
      new: newMovie,
      create,
      index
   }