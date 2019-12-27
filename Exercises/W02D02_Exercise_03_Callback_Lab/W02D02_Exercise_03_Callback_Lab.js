///! Exercise 1

//* A fellow student shows you this code.  When he runs it, he expects it to
//* wait three seconds, then write "Ding!" to the console.  Instead, it writes
//* "Ding!" immediately.  Find the bug and fix it.

let writeDing = () => {
  console.log('Ding!');
}

setTimeout(writeDing, 3000);

setTimeout(() => {
   console.log('Ding!');
 }, 3000);

//! Exercise 2

//* Javascript arrays have a built-in sort method that can take
//* a callback to tell it how to compare the things you want to sort.

//* Research the array sort method.

//* Write the sorting callback as a named function declaration

//* Write the callback function to provide to the sort method so that
//* the following code sorts the words from shortest to longest.

let words = ['short', 'medium', 'delicious', 'nice', 'lengthy'];

function sortArray(word1, word2) {
   if (word1.length > word2.length) {
      return 1;
   } else if (word2.length > word1.length) {
      return -1;
   } else {
      return 0;
   }
}

let sortedWords = words.sort(sortArray);
console.log(sortedWords);

//? Check that logging sortedWords outputs
//? ["nice", "short", "medium", "lengthy", "delicious"]

//! Exercise 3

//* Change Exercise 2 so that:
//*   1. The words sort longest to shortest
//*   2. Use an anonymous inline function

function sortWords2 (word1, word2) {
   if (word1.length < word2.length) {        //? If word1 is greater than word2 
      return 1;
   } else if (word2.length < word1.length) { //? If word1 is less than word2
      return -1;
   } else {
      return 0;
   }
}

let longWordsFirst = words.sort(sortWords2);
console.log(longWordsFirst);
//? Check that logging longWordsFirst outputs
//? ["delicious", "lengthy", "medium", "short", "nice"]


//! Exercise 4

//* Let's pretend that we want to build a sandwich, but adding each
//* ingredient is very cpu intensive, so we want to write each function
//* that adds a certain ingredient to be written as an asynchronous
//* function that, of course, accepts a callback that it will call after
//* the ingredient has been added.

//* The following are the completed functions to build a sandwich with:

let getBread = (sandwich, cb) => {
   setTimeout( () => {
     sandwich.push('bread');
     cb(sandwich);
   }, 1000);
 }
 
 let addMayo = (sandwich, cb) => {
   setTimeout( () => {
     sandwich.push('mayo');
     cb(sandwich);
   }, 900);
 }
 
 let addTurkey = (sandwich, cb) => {
   setTimeout( () => {
     sandwich.push('turkey');
     cb(sandwich);
   }, 800);
 }
 
 let addCheese = (sandwich, cb) => {
   setTimeout( () => {
     sandwich.push('cheese');
     cb(sandwich);
   }, 700);
 }
 
 //* Variable to hold the sandwich's ingredients
 let mySand = [];
 

getBread(mySand, (sandwichWithBread)=> {
   console.log("Get bread callback, sandwich: ", sandwichWithBread);
   addMayo(sandwichWithBread, (sandwichWihBreadWithMayo)=> {
      console.log("add mayo callback, sandwich: ", sandwichWihBreadWithMayo);
      addTurkey(sandwichWihBreadWithMayo, (sandwichWihBreadWithMayoWithTurkey)=> {
         console.log("add turkey callback, sandwich: ", sandwichWihBreadWithMayoWithTurkey);
         addCheese(sandwichWihBreadWithMayoWithTurkey,(sandwichWihBreadWithMayoWithTurkeyWithCheese)=> {
            console.log("add cheese callback, sandwich: ", sandwichWihBreadWithMayoWithTurkeyWithCheese);
         })
      })
   })
})

 //? Assignment: Call the above functions so that logging mySand
 //? after "cheese" has been added
 //? produces these ingredients in the following order:
 //? ["bread", "mayo", "turkey", "cheese"]
 //? Hint: Remember those nested callbacks when calling the step1, step2...

 
//! Bonus
//* Write function named countdown that accepts as an arg the starting number of seconds and console.logs the count down to zero one second apart from each other.

//* For example:
//* countdown(3);
//* console.logs something like the following:
//*   Count: 3
//*   Count: 2
//*   Count: 1
//*   Count: 0

function countdown (seconds) {
   setTimeout(() => {
      console.log(seconds);
      if (seconds > 0) {
         countdown(seconds-1)
      }
   }, 1000);
}
countdown(3);