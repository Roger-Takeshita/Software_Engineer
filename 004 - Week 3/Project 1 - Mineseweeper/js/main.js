/* let numRows = 15;
let numColumns = 15;
let board = [];

function createBoard (rows, columns) {
   drawEmptyBoard(rows, columns);
   dropBombs();
   for (let i = 0 ; i < numRows ; i++) {
      for (let j = 0 ; j < numColumns ; j++) {
         if (board[i][j] !== "b") {
            dropNumbers(i, j);
         }
      }
   }
}

function drawEmptyBoard (rows, columns) {
   let boardHTMl = "";
   for (let i = 0 ; i < rows ; i++) {
      board.push([]);
      for (let j = 0 ; j < columns ; j++) {
         board[i].push(0);
      }
   }
}

function dropBombs () {
   let numBombs = Math.floor(numColumns*numRows*0.30);
   while (numBombs > 0) {
      let randRow = Math.floor(Math.random() * numRows);
      let randColumn = Math.floor(Math.random() * numColumns);
      if (board[randRow][randColumn] === 0) {
         board[randRow][randColumn] = "b"
         numBombs -= 1;
      }
   }
}

function dropNumbers (row, column) {
   let sum = 0;
   for (let i = row-1 ; i <= row+1 ; i++) {
      if (i === -1 || i === numRows) continue
      for (let j = column-1 ; j <= column+1 ; j++) {
         if (j === -1 || j === numColumns) continue
         if (board[i][j] === "b") {
            sum += 1;
         }
      }
   }
   if (sum === 0) {
      board[row][column] = "n";
   } else {
      board[row][column] = sum;
   }
}

createBoard(numRows, numColumns);
console.table(board); */

let board = [];

class Board {
   constructor (rows, columns) {
      this.rows = rows;
      this.columns = columns;
   }
   drawEmptyBoard () {
      let boardHTML = "";
      for (let i = 0 ; i < this.rows ; i++) {
         board.push([]);
         for (let j = 0 ; j < this.columns ; j++) {
            board[i].push(0);

            // add zeros
            boardHTML += `<div class="cell" id="r${i}c${j}"></div>`
         }
      }
      $("#board").html(boardHTML);
   }
   dropBombs () {
      let numBombs = Math.floor(this.columns*this.rows*0.30);
      while (numBombs > 0) {
         let randRow = Math.floor(Math.random() * this.rows);
         let randColumn = Math.floor(Math.random() * this.columns);
         if (board[randRow][randColumn] === 0) {
            board[randRow][randColumn] = "b"
            numBombs -= 1;
         }
      }
   }
   dropNumbers (row, column) {
      let sum = 0;
      for (let i = row-1 ; i <= row+1 ; i++) {
         if (i === -1 || i === this.rows) continue
         for (let j = column-1 ; j <= column+1 ; j++) {
            if (j === -1 || j === this.columns) continue
            if (board[i][j] === "b") {
               sum += 1;
            }
         }
      }
      if (sum === 0) {
         board[row][column] = "n";
      } else {
         board[row][column] = sum;
      }
   }
   create() {
      this.drawEmptyBoard(this.rows, this.columns);
      this.dropBombs();
      for (let i = 0 ; i < this.rows ; i++) {
         for (let j = 0 ; j < this.columns ; j++) {
            if (board[i][j] !== "b") {
               this.dropNumbers(i, j);
            }
         }
      }
   }
}

let newBoard = new Board(15, 15);
newBoard.create()
// console.table(board);

$(".cell").contextmenu(function(event) {
   event.preventDefault();
   if (!this.classList.contains("clicked")) {
      if (this.classList.contains("flagged")) {
         this.classList.remove('flagged')
      } else {
         this.classList.add('flagged')
         // $(`#${this.id}`).html('<img class="flag" src="images/flag.png">');
      }
      console.log(this.id);
      console.log(this);
   }
})

$("#board").on("click", ".cell", function() {
   if (!this.classList.contains("flagged")) {
      this.classList.add('clicked')
      console.log(this.id);
      console.log(this);
   }
});
