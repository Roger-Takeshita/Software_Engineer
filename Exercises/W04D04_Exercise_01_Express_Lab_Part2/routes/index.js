//!                                           mm                              
//!                                           MM                              
//!          `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!            MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
//!            MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
//!            MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
//!          .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

//+ Require packages
  var express = require('express');                    //- Require express packages
  var router = express.Router();                       //- Shorthand for router expresss

//+ Router the Index of Index
  router.get('/', function(request, response, next) {
    response.render('index', { title: 'Express' });    //- Static title
  });

//+ Export index router to our server.js
  module.exports = router;
