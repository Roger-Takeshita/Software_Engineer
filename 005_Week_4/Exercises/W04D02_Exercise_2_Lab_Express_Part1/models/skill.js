//! just like the main.js on a Static HTML

const skills = [
   { skill: 'HTML', have: true },
   { skill: 'CSS', have: true },
   { skill: 'JavaScript', have: true },
   { skill: 'Express', have: false}
];

function getAll() {
   return skills;
}

function getOneSkill(id) {
   return skills[id];
}

module.exports = {
   getAll,
   getOneSkill
};