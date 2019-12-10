//! S Uppercase and singular, convention
let Skill = require("../models/skill");

//! render calls 
function index (request, response) {
   response.render("skills/index", {               //+ "skills/index" is the path to my views folder that is attached to app.set('views', path.join(__dirname, 'views'));
      skills: Skill.getAll(),
      title: "This is my skill(s):"
   });
};

function show (request, response) {
   response.render("skills/show", {
      skill: Skill.getOneSkill(request.params.id)  //+ "skills/show" is the path to my views folder that is attached to app.set('views', path.join(__dirname, 'views'));
   });
};

module.exports = {                                 //! I need to export the methods otherwise you wont be able to access this methods
   index,
   show
}
