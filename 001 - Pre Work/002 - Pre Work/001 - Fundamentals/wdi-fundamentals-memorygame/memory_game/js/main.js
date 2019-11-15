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
   for (let i=0 ; i<=3 ; i++) {
      var cardElement = document.createElement('img');

      cardElement.setAttribute('src', 'images/back.png');  // this method inserts an atribute .setAttribute('attributeName','attributeValue')
      cardElement.setAttribute('data-id',i);
      cardElement.addEventListener('click',flipCard);

      document.getElementById('game-board').appendChild(cardElement)
   }
}

function checkForMatch () {
   if (cardsInPlay[0] === cardsInPlay[1]) {
      console.log("You found a match!");
   } else {
      console.log("Sorry try again");
   }
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
createBoard();