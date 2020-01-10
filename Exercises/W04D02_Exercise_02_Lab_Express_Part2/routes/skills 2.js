//!                                           mm                              
//!                                           MM                              
//!          `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!            MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
//!            MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
//!            MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
//!          .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

//+ Require Packages
   const express = require('express');                      //- Require express packages
   const router = express.Router();                         //- Shorthand for router express
   const skillsCtrl = require('../controllers/skills');     //- Require skills controllers (methods)

//+ Router that reference the controllers
   router.get("/", skillsCtrl.index);                       //- "/"    is a link address - Request (GET)
   router.get("/:id", skillsCtrl.show);                     //- "/:id" is a link address - Request (GET)
   router.delete('/:id', skillsCtrl.delete);                //- "/:id" is a link address - Delete (DELETE)
   router.put("/:id", skillsCtrl.edit)                      //- "/:id" is a link address - Edit/Update (PUT)
                                                               //? It's only "/" or "/:id", beacuse we already declared on the server app.use('/skills', skillsRouter);
                                                               //? The user request (GET) localhost:3000/skills/ or ..:3000/skills/:id
                                                               //? Then we call our controller to execute something
//+ Export skills router to our server.js
   module.exports = router;
