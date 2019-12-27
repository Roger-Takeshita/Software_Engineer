//* 1. completed above) Define a function, as a function declaration, maxOfTwoNumbers that takes two numbers as arguments and returns the largest of them. If they are the same, return that number. Use the if-else construct or a ternary expression - the Math.max method is not allowed.
function maxOfTwoNumbers(x, y) {
   return  x >= y ? x : y;
}

console.log("---------Exercise 1---------");
console.log(maxOfTwoNumbers(3, 9));

 //* 2. Define a function, as a function expression, maxOfThree that takes three numbers as arguments and returns the largest of them. Again, the Math.max method is not allowed.

let maxOfThree = function(num1, num2, num3) {
   let numbers = [];
   if (typeof num1 === "number") {
      numbers.push(num1);
   }
   if (typeof num2 === "number") {
      numbers.push(num2);
   }
   if (typeof num3 === "number") {
      numbers.push(num3);
   }
   numbers = numbers.sort();
   return numbers[numbers.length-1];
};

console.log("---------Exercise 2---------");
console.log(maxOfThree(5,3,8));
console.log(maxOfThree(2,7));

//* 3. Define a function, as a function declaration, isCharAVowel that takes a character as an argument and returns true if it is a vowel, false otherwise.

function isCharAVowel (character) {
   let vowel = ["a","e","i","o","u"];
   for (let i=0 ; i<vowel.length ; i++) {
      if (vowel[i] === character){
         return true;
      }
   }
   return false;
}

console.log("---------Exercise 3---------");
console.log(isCharAVowel("a"));
console.log(isCharAVowel("b"));

//* 4. Define a function, as a function expression, sumArray that takes an array of numbers and returns the sum of those numbers. For example, sumArray([2, 4, 5]); would return 11.

let sumArray = function(numbers) {
   let total = 0;
   numbers.forEach(function(number){
      total += number;
   });
   return total;
};

console.log("---------Exercise 4---------");
console.log(sumArray([1,2,3]));

//* 5. Define a function, as a function declaration, multiplyArray that takes an array of numbers and returns the product those numbers. For example, multiplyArray([2, 4, 5]); would return 40.

function multiplyArray (numbers) {
   let total = 1;
   numbers.forEach(function(number) {
      total *= number;
   });
   return total;
}

console.log("---------Exercise 5---------");
console.log(multiplyArray([1,2,3]));

//* 6. Define a function, as a function expression, numArgs that returns the number of arguments passed to the function when called.
let numArgs = function(arg) {
   let contArg = 0;
   arg.forEach(function(argument){
      contArg += 1;
   });
   return contArg;
};

console.log("---------Exercise 6---------");
console.log(numArgs([1,2,3]));

//* 7. Define a function, as a function declaration, reverseString that takes a string, reverses the characters, and returns it. For example, reverseString('rockstar'); would return the string "ratskcor".

function reverseString (string) {
   let revString = "";
   for(let i=string.length-1 ; i>=0 ; i--) {
      revString += string[i];
   }
   return revString;
}

console.log("---------Exercise 7---------");
console.log(reverseString("rockstar"));

//* 8. Define a function, as a function expression, longestStringInArray that takes an array of strings as an argument and returns the length of the longest string.

let longestStringArray = function(stringsArray) {
   let countArray = 0;
   let stringContent = "";
   stringsArray.forEach(function(string){
      if (string.length > countArray) {
         countArray = string.length;
         stringContent = string;
      }
   });
   return stringContent;
};

console.log("---------Exercise 8---------");
console.log(longestStringArray(["function", "expression", "longestStringInArray", "that", "takes"]));

//* 9. Define a function, as a function declaration, stringsLongerThan that takes an array of strings and a number as arguments; and returns an array of the strings that are longer than the number passed in. For example, stringsLongerThan(['say', 'hello', 'in', 'the', 'morning'], 3); would return ["hello", "morning"].

function stringsLongerThan (strings, number) {
   let newSringArray = [];
   strings.forEach(function(string){
      if (string.length > number) {
         newSringArray.push(string);
      }
   });
   return newSringArray;
}

console.log("---------Exercise 9---------");
console.log(stringsLongerThan(['say', 'hello', 'in', 'the', 'morning'], 3));