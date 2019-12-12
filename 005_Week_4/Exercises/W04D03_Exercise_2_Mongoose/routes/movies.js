//!                                           mm                              
//!                                           MM                              
//!          `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!            MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
//!            MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
//!            MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
//!          .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

//+ Always add:
  var express = require('express');   //- We require the express package
  var router = express.Router();      //- We require a Router to create an instance of the express router

//+ Import the movies controller, so we can use with our routers
  let moviesCtrl = require("../controllers/movies");

//+ Router the request to our controller
  //- GET /movies/new ----> it's only "/" because we alreay defined the path "/movies/" in our server.js file
    router.get('/new', moviesCtrl.new); //* "/new" is the url request

  //- POST /Movies/   ----> "/"
    router.post("/", moviesCtrl.create);
  
  //- GET All the Movies
    router.get('/index', moviesCtrl.index)

//+ Export
  module.exports = router;
