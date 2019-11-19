//! Practice Exercises
//? Exercise 2 - Looping

//? Use one of the looping statements to continue to execute the code you wrote in the previous exercise until the phrase no more fruit is entered by the user.

while (true) {
   let choice = prompt("Enter a, b or c");

   if (choice === "a") {
      console.log("a is for apple");
   } else if (choice === "b") {
      console.log("b is for banana");
   } else if (choice === "c") {
      console.log("c is for cataloupe");
   } else if (choice === "no more fruit") {
      break;
   } else {
      console.log("You're a rabel!");
   }
}