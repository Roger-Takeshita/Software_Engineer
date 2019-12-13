//!                             ,,                                                  AW                                    ,,             ,,          
//!                           `7MM                                                 ,M'                                  `7MM           `7MM          
//!                             MM                                                 MV                                     MM             MM          
//!          ,pP"Ybd  ,p6"bo    MMpMMMb.   .gP"Ya  `7MMpMMMb.pMMMb.   ,6"Yb.      AW   `7MMpMMMb.pMMMb.   ,pW"Wq.    ,M""bMM   .gP"Ya    MM  ,pP"Ybd 
//!          8I   `" 6M'  OO    MM    MM  ,M'   Yb   MM    MM    MM  8)   MM     ,M'     MM    MM    MM  6W'   `Wb ,AP    MM  ,M'   Yb   MM  8I   `" 
//!          `YMMMa. 8M         MM    MM  8M""""""   MM    MM    MM   ,pm9MM     MV      MM    MM    MM  8M     M8 8MI    MM  8M""""""   MM  `YMMMa. 
//!          L.   I8 YM.    ,   MM    MM  YM.    ,   MM    MM    MM  8M   MM    AW       MM    MM    MM  YA.   ,A9 `Mb    MM  YM.    ,   MM  L.   I8 
//!          M9mmmP'  YMbmd'  .JMML  JMML. `Mbmmd' .JMML  JMML  JMML.`Moo9^Yo. ,M'     .JMML  JMML  JMML. `Ybmd9'   `Wbmd"MML. `Mbmmd' .JMML.M9mmmP' 
//!                                                                            MV                                                                    
//!                                                                           AW                                                                     


//+ This is our database schema, since we are not using mongoDB, this is a hard coded BD
   const skills = [
      {
         skill: 'HTML', have: true 
      },
      {
         skill: 'CSS', have: true 
      },
      {
         skill: 'JavaScript', have: true 
      },
      {
         skill: 'Express', have: false
      }
   ];

//+ Function/Method to read all skills of our database
   function getAll() {
      return skills;
   };

//+ Function/Method to get only one skill (by id) of our database
   function getOneSkill(id) {
      return skills[id];
   };

//+ Function/Method to delete one skill
   function deleteOneSkill(id) {
      skills.splice(id, 1);
   }

//+ Export the functions/methods so we can use them in our controllers
   module.exports = {
      getAll,
      getOneSkill,
      deleteOneSkill
   };