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
            boardHTML += `<div class="cell" id="r${i}c${j}"></div>`;
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
            $(`#r${randRow}c${randColumn}`).addClass("b");;
            numBombs -= 1;
         }
      }
   }
   dropNumbers (row, column) {
      let sum = 0;
      let $rowColumn = $(`#r${row}c${column}`);
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
         $rowColumn.addClass("n");
      } else {
         board[row][column] = sum;
         switch (sum) {
            case 1:
               $rowColumn.addClass("one");
               break;
            case 2:
               $rowColumn.addClass("two");
               break;
            case 3:
               $rowColumn.addClass("three");
               break;
            case 4:
               $rowColumn.addClass("four");
               break;
            case 5:
               $rowColumn.addClass("five");
               break;
            case 6:
               $rowColumn.addClass("six");
               break;
         }
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

function checkPosition (row, column) {
   let rowColumn = board[row][column];
   $(`#r${row}c${column}`).html(rowColumn)
   // switch ($rowColumn) {
   //    case "b":
   //          $(`#r${row}c${column}`).html("b")
   //       break
   //    default :
   //          $(`#r${row}c${column}`).html("b")
   //       break;
   // }
}


let newBoard = new Board(15, 15);
newBoard.create()
console.table(board);

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
   let clickedRow, clickedColumn;
   if (!this.classList.contains("flagged")) {
      this.classList.add('clicked')
      console.log(this.id);
      clickedRow = this.id.slice(1,this.id.indexOf("c"));
      clickedColumn = this.id.slice(this.id.indexOf("c")+1,this.id.length);
      checkPosition(clickedRow, clickedColumn);
      console.log(this);
      // console.log(clickedRow,clickedColumn);
   }
});

