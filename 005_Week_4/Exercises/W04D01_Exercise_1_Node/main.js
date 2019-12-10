
//! Example 1 - running a js file on terminal
   //- Type "node <name of the file>" on terminal
   // function multi(numberOne, numberTwo) {
   //    return numberOne*numberTwo;
   // }
   // console.log(multi(5,8));

   // const multiply = (a,b) => a*b;
   // console.log(multiply(5,8));

//! Example 2 - Loading a module
   //- Loading the module into a variable (require)
   const dow = require("./days-of-the-week.js");
   // const fs = require("fs");
   // console.log(typeof fs);

   // fs.writeFile("./hello.txt", "Hello!", function () {
   //    console.log("Done creating file");
   // });

   // console.log("I'm frist?");
   console.log(dow);
   console.log(dow.getWeekDays(5));