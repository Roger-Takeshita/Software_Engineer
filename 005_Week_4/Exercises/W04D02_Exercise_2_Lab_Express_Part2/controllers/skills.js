//!                                                                      ,,    ,,                            
//!                                           mm                       `7MM  `7MM                            
//!                                           MM                         MM    MM                            
//!           ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!          6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
//!          8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
//!          YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
//!           YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP' 

//+ Require the Pakages
   let Skill = require("../models/skill");            //- Require the schema/model so we can work with the data
                                                      //- By convention, the first letter is captalized and it's a singular word

//+ Function/Method to render the index page
   function index (request, response) {
      response.render("skills/index", {               //- "skills/index" is the path to my views folder that is attached to app.set('views', path.join(__dirname, 'views'));
         skills: Skill.getAll(),                      //- From our schema/models we transform the data into an object so we can manipulate into the file .ejs
         title: "This is my skill(s):"
      });
   };

//+ Function/Method to render the show page
   function show (request, response) {
      response.render("skills/show", {                //- "skills/show" is the path to my views folder that is attached to app.set('views', path.join(__dirname, 'views'));
         skill: Skill.getOneSkill(request.params.id), //- request.params.id - get the id from request (in other words, once the user click on an especific item, this will send the id)
         skillId: request.params.id                   //- Added an Id, this way you can use in our ejs
      });
   };

//+ Function/Method to delete an item from our schema/model
   function deleteSkill (request, response) {
      Skill.deleteOneSkill(request.params.id);
      response.redirect('/skills');
   }

//+ Function/Method to edit an item from our schema/model
   function edit(request, response) {
      if (request.body.have === "on"){ 
         request.body.have = true;
      } else {
         request.body.have = false;
      }
      // console.log(request.params.id);
      // console.log(request.body.skill);
      // console.log(request.body.have);
      Skill.editOneSkill(request.params.id, request.body);
      response.redirect('/skills');
   }

//+ Export the functions/methods, otherwise we won't be able to call it from the routers
   module.exports = {
      index,
      show,
      delete: deleteSkill,
      edit
   }
