//! EXERCISE 1: Write a Function Declaration
//? Write a function named computeArea using the function declaration approach.

//? It will have two parameters: width & height.
//? It will compute the area of a rectangle (width X height) and return a string in the following form:
//? The area of a rectangle with a width of ___ and a height of ___ is ___ square units
//? Invoke the function to test it.

function computeArea (width, height) {
   return `The area of a rectangle with a width of ${width} and a height of ${height} is ${width*height} square units`;
}

console.log("-------------Exercise 1-------------");
console.log(computeArea(200,2));
console.log();


//! EXERCISE 2: Write a Function Expression
//? Write a function named planetHasWater using the function expression syntax.

//? It will have one parameter: planet.
//? Return true if the planet argument is either "Earth" or "Mars", otherwise return false.
//? Bonus points if you ensure the function will work regardless of the casing of the planet being passed in ('earth', 'MARS', etc.).
//? Invoke the function a couple of times to test it!

let planetHasWater = function(planet) {
   if (planet.toLowerCase() === "earth" || planet.toLowerCase() === "mars"){
      return `Yeah ${planet.toLowerCase()} has water!`;
   } else {
      return "Wrong planet";
   }
};

console.log("-------------Exercise 2-------------");
console.log(planetHasWater("earth"));
console.log(planetHasWater("EarTh"));
console.log(planetHasWater("mars"));
console.log(planetHasWater("marS"));
console.log(planetHasWater("Jupyter"));