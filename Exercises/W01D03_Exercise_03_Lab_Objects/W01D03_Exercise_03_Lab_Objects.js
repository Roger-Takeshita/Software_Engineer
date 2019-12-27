//! Exercise 3 - Lab Objects   ->   https://git.generalassemb.ly/roger-takeshita/Software-Enginner/blob/master/work/w01/d3/04-js-objects-lab.md
//? Setup
//*    Create a new repl in your repl.it account.
//*    Name the repl Guess the Number Lab.
//*    Copy over the work already done on the game object from the lesson earlier. To make the game object's code 'cleaner', let's move the properties that were added separately during the lesson, into the object literal so that it looks like this:
//       const game = {
//         title: 'Guess the Number!',
//         biggestNum: 100,
//         smallestNum: 1,
//         secretNum: null,
//         play: function() {
//           this.secretNum = Math.floor(Math.random() * 
//             (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
//         }
//       };
//*      Note that numGuesses has been removed because you will be adding a prevGuesses array whose length can be used to obtain the number of guesses when needed.
//? Features
//*    Allow the player to continually be prompted to enter their guess of what the secret number is until they guess correctly.
//*    If the player has an incorrect guess, display an alert message that informs the player:
//*    Whether their guess is too high, or too low, and...
//*    A list of all the previously guessed numbers (without showing the square brackets of an array).
//*    If the player has guessed the secret number:
//*       Display an alert message that congrats the player and informs them of how many guesses they took.
//*       End the game play.
//? Tasks
//*    Completing the following tasks will result in a working Guess the Number game:
//*       Add a prevGuesses property to the game object initialized to an empty array.
//*       Add a getGuess method to game that prompts the player to enter a guess with a message formatted as: Enter a guess between [smallestNum] and [biggestNum]:. Hint - use a template literal for the prompt message.
//*       Ensure that the getGuess method returns a value that is:
//*          Is a number, not a string.
//*          Is between smallestNum and biggestNum, inclusive.
//? Hints:
//*    This is a great use case for a while loop.
//*    parseInt returns NaN if the string cannot be parsed into a number.
//*    From within the play method, invoke the getGuess method and add the new guess to the prevGuesses array.

//? Add a render method to game that play will call after a guess has been made that alerts:
//*    If the secret has been guessed:
//*       Congrats! You guessed the number in [x] guesses!
//*    Otherwise:
//*       Your guess is too [high|low]
//*       Previous guesses: x, x, x, x
//? Hints:
//*    render won't be able to access any of play's local variables, e.g., guess, so be sure pass render any arguments as needed.
//*    Template literals not only have interpolation, they honor whitespace - including line breaks!
//*    The list of previous guesses can be generated using the array join method.
//*    The play method should end (return) when the guess matches secretNum.
//? Bonus
//*    When play is run, immediately prompt the player to enter the smallest and biggest numbers instead of having them pre-set.
//*    Super Bonus
//*    Eliminate prompt and alert by writing this as an HTML/CSS/JS app! FYI, repl.it has HTML/CSS/JS repls.
//! Solution
//!    https://repl.it/@jim_clark/Guess-the-Number-Lab

const game = {
   title: 'Guess the Number!',
   biggestNum: 100,
   smallestNum: 1,
   secretNum: null,
   play: function() {
      this.smallestNum = prompt("Enter the smallest number: ");
      while(isNaN(this.smallestNum) || this.smallestNum < 0) {
         if (this.smallestNum === "quit") {
            return;
         } else if(isNaN(this.smallestNum)) {
            alert("String is not permited! Please try again!");
         } else if (this.smallestNum < 0){
            alert("The value has to be greater or equal to 0. \nNegative value is not permited! \nPlease try again.");
         }
         this.smallestNum = prompt("Enter the smallest number: ");
      }
      this.smallestNum = parseInt(this.smallestNum);
      this.biggestNum = prompt("Enter the biggest number: ");
      while(isNaN(this.biggestNum) || this.smallestNum === this.biggestNum || this.biggestNum <= this.smallestNum) {
         if (this.biggestNum === "quit") {
            return;
         } else if(isNaN(this.biggestNum)) {
            alert("String is not permited! Please try again.");
         }else if (this.biggestNum <= this.smallestNum) {
            alert(`The value has to be greater than ${this.smallestNum}!`)
         }
         this.biggestNum = prompt("Enter the biggest number: ");
      }
      this.biggestNum = parseInt(this.biggestNum);
      this.secretNum = Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
      console.table(game);
      let status = this.render(this.getGuess(), this.secretNum, this.smallestNum, this.biggestNum, this.prevGuesses);
      console.table(game);
      while(!status) {
         status = this.render(this.getGuess(), this.secretNum, this.smallestNum, this.biggestNum, this.prevGuesses);
         console.table(game);
      }
      return;
   }
};

game.prevGuesses = [];

game.getGuess = function() {
   let value = -1;
   while(value === -1 || isNaN(value) || value < this.smallestNum || value > this.biggestNum) {
      value = prompt(`#${this.prevGuesses.length} - Enter a number between ${this.smallestNum} and ${this.biggestNum} or "quit" to exit: `);
      if (value === "quit") {
         return "quit";
      } else {
         value = parseInt(value);
      }
   }
   this.prevGuesses.push(value);
   return value;
}

game.render = function(number, secretNumber, minNumber, maxNumber, guessedArray) {
   if (number === "quit") {
      return true;
   } else if (number === secretNumber) {
      alert(`Congrats! You guessed the number (${number}) in ${guessedArray.length} guesses!`);
      return true;
   } else {
      number > secretNumber ? alert(`Your guess is too HIGH. \nPrevious guesses: ${guessedArray.join(", ")}.`) : alert(`Your guess is too LOW. \nPrevious guesses: ${guessedArray.join(", ")}.`);
      return false;
   }
}

game.play();