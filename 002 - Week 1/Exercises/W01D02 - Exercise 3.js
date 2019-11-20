//! Creating Arrays - Exercise (2 mins)

//? Create a new JS Repl in repl.it and name it JS Arrays

//? Create an array consisting of three of your favorite movies (strings) and assign it to a variable named movies.

// Tradition way to create an array
let myMovies = ["Back to The Future", "Lion King", "Kill Bill"];

// Other option new Array ()
let myMovies2 = new Array("Back to The Future", "Lion King", "Kill Bill");

console.log("Movies " + myMovies);
console.log(myMovies2);

// Add an item to the end of the array
myMovies.push ("Harry Potter")
console.log(myMovies);

// Revomves the last item of the array
myMovies2.pop();
console.log(myMovies2);

// Removes an item from the front of the array
myMovies.shift()
console.log(myMovies);

// Add an item to the front of the array
myMovies.unshift("Movies 0")
console.log(myMovies);