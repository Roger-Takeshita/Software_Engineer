let board, winner = null,
    turn;
const PLAYERS = {
   "1" : "X",
   "0" : "",
   "-1": "O"
};
const symbolOptionsElement = document.getElementById("board-symbol");
const boardElement = document.getElementById("board");
const newMessageElement = document.getElementById("msg");

function init () {
   board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
   ],
   winner = null,
   turn = 1;
   // render();
}

function render () {
   if (winner !== "draw") {
      if (winner === null ) {
         turn *= -1;
         newMessageElement.innerHTML = `<p id="new-message"><span style="color:red"><strong>${PLAYERS[turn]}</strong></span>'s Turn</p>`;      
      } else {
         newMessageElement.innerHTML = `<p id="new-message"><span style="color:red">${PLAYERS[turn]}</span>&nbsp;Wins</p>`; 
         boardElement.removeEventListener("click", play);
         boardElement.removeEventListener("mouseover", isItHere);
         boardElement.removeEventListener("mouseout", itIsNotHere);
         let countTime = 0;
         let lastMsgFlag = true;
         let countdownNewGame = 3;
         var counter = setInterval(function(){
            if (lastMsgFlag) { 
               if (countTime > 3) lastMsgFlag = false;
            } else {
               newMessageElement.innerHTML = `<p id="new-message"><span style="color:red">${countdownNewGame}</span></p>`; 
               countdownNewGame -= 1;
               if (countdownNewGame === -1) {
                  clearInterval(counter);
                  newBoard();
               }
            }
            countTime += 1;
         }, 1000);
      }
   } else {
      newMessageElement.innerHTML = `<p id="new-message"><span style="color:red"><strong>DRAW</strong></span></p>`; 
   }
}

function newBoard () {
   init();
   newMessageElement.innerHTML = `
      <div>
         <p>Choose Your Destiny</p>   
      </div>
      <div id="symbols">
         <div id="board-symbol">
            <div id="symbol1">X</div>
            <div id="symbol2">O</div>
         </div>
      </div>
   `;
   document.getElementById("board-symbol").addEventListener("click", updateMsgDiv);
   checkWinner();
}

function checkWinner () {
   let hasZero = board.length-1;
   for (let rowCount = 0 ; rowCount < board.length ; rowCount++) {
      for (let columnCount = 0 ; columnCount < board[0].length ; columnCount++) {
         if (board[columnCount][rowCount] === 0) {
            document.getElementById(`R${rowCount}C${columnCount}`).innerText = "";
         }
         winner = checkColumn(columnCount, rowCount)    ||
                  checkRow   (columnCount, rowCount)    ||
                  checkDiag  (columnCount, rowCount, 1) ||
                  checkDiag  (columnCount, rowCount, -1);
         if (winner) break;
      }
      if (winner) break;
      if (board[rowCount].indexOf(0) === -1) {
         hasZero -=1;
      }
   }
   if (!winner && hasZero === -1) {
      winner = "draw";
   }
}

function play () {
   let boardPositionElement = event.target.id;
   // console.log(boardPositionElement);
   if (boardPositionElement !== "board") {
      let row = boardPositionElement[1];
      let column = boardPositionElement[3];
      if (board[column][row] === 0) {
         document.getElementById(`R${row}C${column}`).innerText = PLAYERS[turn];
         board[column][row] = turn;
      } else {
         return;
      }
   }
   checkWinner();
   render();
}

function isItHere () {
   let boardPositionElement = event.target.id;
   if (boardPositionElement !== "board") {
      let row = boardPositionElement[1];
      let column = boardPositionElement[3];
      if (board[column][row] === 0) {
         document.getElementById(`R${row}C${column}`).innerText = PLAYERS[turn];
      }
   }
}

function itIsNotHere () {
   let boardPositionElement = event.target.id;
   if (boardPositionElement !== "board") {
      let row = boardPositionElement[1];
      let column = boardPositionElement[3];
      if (board[column][row] === 0) {
         document.getElementById(`R${row}C${column}`).innerText = "";
      }
   }
}

function updateMsgDiv () {
   const symbolElement = event.target.textContent;
   if (symbolElement === "O") {
      PLAYERS["1"] = symbolElement;
      PLAYERS["-1"] = "X";
   }
   symbolOptionsElement.removeEventListener("click", updateMsgDiv);
   newMessageElement.innerHTML = `<p id="new-message"><span style="color:red"><strong>${PLAYERS[turn]}</strong></span>'s Turn</p>`;
   boardElement.addEventListener("click", play);
   boardElement.addEventListener("mouseover", isItHere);
   boardElement.addEventListener("mouseout", itIsNotHere);
}

function checkColumn (column, row) {
   if (row !== 0) return null;
   return Math.abs(board[column][row] + board[column][row+1] + board[column][row+2]) === 3 ? turn : null;
}

function checkRow (column, row) {
   if (column !== 0) return null;
   return Math.abs(board[column][row] + board[column+1][row] + board[column+2][row]) === 3 ? turn : null;
}

function checkDiag (column, row, direction) {
   if (direction == -1) {
      if (row < 2 || column > 0) return null;
   } else {
      if (row > 0 || column > 0) return null;
   }
   return Math.abs(board[column][row] + board[column+1][row+direction*1] + board[column+2][row+direction*2]) === 3 ? turn : null;
}

symbolOptionsElement.addEventListener("click", updateMsgDiv);
init();