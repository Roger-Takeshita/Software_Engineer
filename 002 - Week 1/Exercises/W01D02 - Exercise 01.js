//! Exercise 1 - Branching
//? The following JavaScript code will accept string input from the user and store the string in a variable named choice:

//?  let choice = prompt('Enter a, b or c');
//? Write an if statement that console.logs the following messages:

//? a entered - "a is for apple"
//? b entered - "b is for banana"
//? c entered - "c is for cantaloupe"
//? anything else - "you're a rebel"

let choice = prompt("Enter a, b or c");

if (choice === "a") {
   console.log("a is for apple");
} else if (choice === "b") {
   console.log("b is for banana");
} else if (choice === "c") {
   console.log("c is for cataloupe");
} else {
   console.log("you're a rabel");
}