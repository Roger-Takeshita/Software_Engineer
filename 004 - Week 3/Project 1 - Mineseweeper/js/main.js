let board = [];
let timer;
let bombs = 0;

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
      let $board = $('#board')
      $board.html(boardHTML);
      $board.css({
         'grid-template-columns': `repeat(${this.columns}, 35px)`,
         'grid-template-rows': `repeat(${this.rows}, 35px)`
      })
   }
   dropBombs () {
      let numBombs = bombs = Math.floor(this.columns*this.rows*0.15);
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
   if (rowColumn === "b") {
      clearInterval(timer);
      $("#start-btn").removeClass("playing");
      $("#start-btn").addClass("lose");
   }
   console.log(rowColumn);
   if (rowColumn != "c" && rowColumn != "n") {
      $(`#r${row}c${column}`).html(rowColumn)
      board[row][column] = "c"; 
   } else {
      checkEmptySpots(row,column);
   }
   console.table(board);
   // if (rowColumn === "n") {
   //    for (let i = row-1 ; i <= row+1 ; i++) {
   //       if (i === -1 || i === this.rows) continue
   //       for (let j = column-1 ; j <= column+1 ; j++) {
   //          if (j === -1 || j === this.columns) continue
   //          if (board[i][j] === "b") {
   //             sum += 1;
   //          }
   //       }
   //    }
   // }
}
let recursiveCheck = [];
function checkEmptySpots (row, column) {
   let reCheckRow, reCheckColumn;
   for (let i = 1 ; i <= 4 ; i++) {
      switch (i) {
         case 1:  //! Left
            if (column >= 0 && column < board[0].length) {
               if (column-1 >= 0 && board[row][column-1] != "c") {
                  let $cell = $(`#r${row}c${column-1}`);
                  if (board[row][column-1] === "n") {
                     $cell.html(board[row][column-1]);
                     $cell.addClass("clicked");
                     board[row][column-1] = "c";
                     recursiveCheck.push(`r${row}c${column}`);
                     checkEmptySpots(row, column-1);
                  } else {
                     $cell.html(board[row][column-1]);
                     $cell.addClass("clicked");
                     board[row][column-1] = "c";

                     // $cell.html(board[row+1][column-1]);
                     // $cell.addClass("clicked");
                     // board[row+1][column-1] = "c";

                     // $cell.html(board[row-1][column-1]);
                     // $cell.addClass("clicked");
                     // board[row-1][column-1] = "c";
                  }
               }   
            }
            break
         case 2:  //! Up
            if (row >= 0 &&  row < board.length) {
               if (row+1 < board.length && board[row+1][column] != "c") {
                  let $cell = $(`#r${row+1}c${column}`);
                  if (board[row+1][column] === "n") {
                     $cell.html(board[row+1][column]);
                     $cell.addClass("clicked");
                     board[row+1][column] = "c";
                     recursiveCheck.push(`r${row}c${column}`);
                     checkEmptySpots(row+1, column);
                  } else {
                     $cell.html(board[row+1][column]);
                     $cell.addClass("clicked");
                     board[row+1][column] = "c";

                     // $cell.html(board[row+1][column+1]);
                     // $cell.addClass("clicked");
                     // board[row+1][column+1] = "c";

                     // $cell.html(board[row+1][column-1]);
                     // $cell.addClass("clicked");
                     // board[row+1][column-1] = "c";
                  }
               } 
            }
            break
         case 3:  //! Right
            if (column >= 0 && column < board[0].length) {
               if (column+1 < board[0].length && board[row][column+1] != "c") {
                  let $cell = $(`#r${row}c${column+1}`);
                  if (board[row][column+1] === "n") {
                     $cell.html(board[row][column+1]);
                     $cell.addClass("clicked");
                     board[row][column+1] = "c";
                     recursiveCheck.push(`r${row}c${column}`);
                     checkEmptySpots(row, column+1);
                  } else {
                     $cell.html(board[row][column+1]);
                     $cell.addClass("clicked");
                     board[row][column+1] = "c";

                     // $cell.html(board[row+1][column+1]);
                     // $cell.addClass("clicked");
                     // board[row+1][column+1] = "c";

                     // $cell.html(board[row-1][column+1]);
                     // $cell.addClass("clicked");
                     // board[row-1][column+1] = "c";
                  }
               }
            }
            break;
         case 4:  //! Down
            if (row >= 0 && row < board.length) {
               if (row-1 >= 0 && board[row-1][column] != "c") {
                  let $cell = $(`#r${row-1}c${column}`);
                  if (board[row-1][column] === "n") {
                     $cell.html(board[row-1][column])
                     $cell.addClass("clicked");
                     board[row-1][column] = "c";
                     recursiveCheck.push(`r${row}c${column}`);
                     checkEmptySpots(row-1, column);
                  } else {
                     $cell.html(board[row-1][column]);
                     $cell.addClass("clicked");
                     board[row-1][column] = "c";

                     // $cell.html(board[row-1][column+1]);
                     // $cell.addClass("clicked");
                     // board[row-1][column+1] = "c";

                     // $cell.html(board[row-1][column-1]);
                     // $cell.addClass("clicked");
                     // board[row-1][column-1] = "c";
                  }
               }
            }
            break;
         default:
               reCheckRow = parseInt(recursiveCheck[recursiveCheck.length].slice(1,recursiveCheck[recursiveCheck.length].indexOf("c")));
               reCheckColumn = parseInt(recursiveCheck[recursiveCheck.length].slice(recursiveCheck[recursiveCheck.length].indexOf("c")+1,recursiveCheck[recursiveCheck.length].length));
               recursiveCheck.pop();
               checkEmptySpots(reCheckRow, reCheckColumn);
            break;
      }
      // console.table(board);
   }
}

let newBoard = new Board(20, 20);
newBoard.create()
console.table(board);

$("#start-btn").click(function () {
   if (timer === undefined) {
      let sec = 0;
      let min = 0;
      let hour = 0;
      $("#start-btn").removeClass("start");
      $("#start-btn").addClass("playing");
      if (bombs < 10) {
         $("#num-bombs p").html(`00${bombs}`);
      } else if (bombs < 100) {
         $("#num-bombs p").html(`0${bombs}`);
      } else {
         $("#num-bombs p").html(bombs);
      }
      timer = setInterval(() => {
         sec += 1;
         if (sec<10) {
            $("#second").text(`0${sec}`);
         } else {
            $("#second").text(sec);
         }
         if (sec === 59){
            sec = 0;
            min += 1;
            if (min<10) {
               $("#minute").text(`0${min}`);
            } else {
               $("#minute").text(min);
            }
         }
         if (min === 59) {
            min = 0;
            hour += 1;
            if (hour<10) {
               $("#hour").text(`0${hour}`);
            } else {
               if (hour > 23) {
                  hour = 0;
               }
               $("#hour").text(hour);
            }
         }
      }, 1000);
   }
});

$(".cell").contextmenu(function(event) {
   event.preventDefault();
   if (bombs > 0) {
      if (!this.classList.contains("clicked")) {
         if (this.classList.contains("flagged")) {
            this.classList.remove('flagged')
            bombs += 1;
         } else {
            this.classList.add('flagged')
            bombs -= 1;
         }
         // console.log(this.id);
         // console.log(this);
      }
      if (bombs < 10) {
         $("#num-bombs p").html(`00${bombs}`);
      } else if (bombs < 100) {
         $("#num-bombs p").html(`0${bombs}`);
      } else {
         $("#num-bombs p").html(bombs);
      }
   }
});

$("#board").on("click", ".cell", function() {
   let clickedRow, clickedColumn;
   if (!this.classList.contains("flagged")) {
      this.classList.add('clicked')
      clickedRow = parseInt(this.id.slice(1,this.id.indexOf("c")));
      clickedColumn = parseInt(this.id.slice(this.id.indexOf("c")+1,this.id.length));
      checkPosition(clickedRow, clickedColumn);
      // console.log(this.id);
      // console.log(this);
      // console.log(clickedRow,clickedColumn);
   }
});

