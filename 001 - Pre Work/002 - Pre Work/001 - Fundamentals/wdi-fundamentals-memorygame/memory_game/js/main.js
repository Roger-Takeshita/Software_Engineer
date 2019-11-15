var scoreCount = 0;
var cards = [
   {
      rank: "queen",
      suit: "hearts",
      cardImage: "images/queen-of-hearts.png"
   },
   {
      rank: "queen",
      suit: "diamonds",
      cardImage: "images/queen-of-diamonds.png"
   },
   {
      rank: "king",
      suit: "hearts",
      cardImage: "images/king-of-hearts.png"
   },
   {
      rank: "king",
      suit: "diamonds",
      cardImage: "images/king-of-diamonds.png"
   }
];

var cardsInPlay = [];

function createBoard () {
   var elementExits = document.querySelector('.p-msg');
   var divImgElement = document.createElement('div');
   
   cardsInPlay = [];
   if (elementExits != null) {
      document.querySelector('.p-msg').remove();
   }
   divImgElement.setAttribute('class', 'div-image');
   document.getElementById('game-board').appendChild(divImgElement);

   for (let i=0 ; i<=3 ; i++) {
      var cardElement = document.createElement('img');

      cardElement.setAttribute('src', 'images/back.png');  // this method inserts an atribute .setAttribute('attributeName','attributeValue')
      cardElement.setAttribute('data-id',i);
      cardElement.addEventListener('click',flipCard);
      document.querySelector('.div-image').appendChild(cardElement);
   }
}

function removeBoard() {
   document.querySelector('.div-image').remove();
}

function displayMsg(string) {
   var msgElement = document.createElement('p');

   removeBoard();
   msgElement.setAttribute('class', 'p-msg');
   msgElement.textContent = string;
   document.getElementById('game-board').appendChild(msgElement);
}

function checkForMatch () {
   var msg;
   if (cardsInPlay[0] === cardsInPlay[1]) {
      msg = "You found a match!";
      scoreCount += 1;
   } else {
      msg = "Sorry try again!";
   }

   console.log(msg);
   displayMsg(msg);
   updateScore();

   // setInterval(function(){ alert("Hello"); }, 4000);
   var timer = setInterval(function(){ 
      createBoard();
      clearInterval(timer);
   }, 2500);  
}

function flipCard () {
   cardId = this.getAttribute('data-id');
   console.log('User flipped ' + cards[cardId].rank);
   console.log(cards[cardId].cardImage);
   console.log(cards[cardId].suit)
   
   cardsInPlay.push(cards[cardId].rank)
   this.setAttribute('src',cards[cardId].cardImage);
   if (cardsInPlay.length === 2) {
      checkForMatch();
   }
}

function updateScore() {
   document.querySelector('.score').textContent = "Your Score: " + scoreCount;
}

createBoard();