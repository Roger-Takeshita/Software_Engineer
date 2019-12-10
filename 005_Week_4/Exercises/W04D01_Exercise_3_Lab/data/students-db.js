const students = [
   {
      name : "Roger", 
      id: 0
   },
   {
      name : "Hiroshi",
      id: 1
   },
   {
      name : "Takeshita",
      id: 2
   },
   {
      name : "Thaisa",
      id: 3
   },
   {
      name : "Mayumi",
      id: 4
   },
   {
      name : "Sakima",
      id: 5
   }
];

module.exports = {
   getAll: () => {
      return students;
   },
   getOne: (id) => {
      // console.log(students[id].name);
      return students[id];
   }
};