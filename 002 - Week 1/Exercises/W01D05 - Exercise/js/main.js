//! =============================================== Variables
   let board, winner, turn;
   const msgElement = document.getElementById("msg");
   const COLORS = {
      "1"  : "purple",
      "0"  : "white",
      "-1" : "lime"
   };
//! =============================================== Functions
   function init() {
      turn = 1;
      winner = null;
      board = [
         // Row 0, 1, 2, 3, 4, 5
         [0, 0, 0, 0, 0, 0], // col0
         [0, 0, 0, 0, 0, 0], // col1
         [0, 0, 0, 0, 0, 0], // col2
         [0, 0, 0, 0, 0, 0], // col3
         [0, 0, 0, 0, 0, 0], // col4
         [0, 0, 0, 0, 0, 0], // col5
         [0, 0, 0, 0, 0, 0]  // col6

         // Tie Test
         // [ 1,-1,-1, 1, 1,-1], // col0
         // [-1, 1, 1,-1,-1, 0], // col1
         // [ 1,-1,-1, 1, 1,-1], // col2
         // [-1, 1, 1,-1,-1, 1], // col3
         // [ 1,-1,-1, 1, 1,-1], // col4
         // [-1, 1, 1,-1,-1, 1], // col5
         // [ 1,-1,-1, 1, 1,-1]  // col6
      ];
      render();
   }

   function render() {
      board.forEach((columnArray, columnIndex) => {
         // console.log(columnArray, columnIndex);
         const markerElement = document.getElementById(`col${columnIndex}`);
         markerElement.style.borderTopColor = columnArray.includes(0) ? "lightgrey" : "white";
         columnArray.forEach((cell, rowIndex) => {
            const cellElement = document.getElementById(`c${columnIndex}r${rowIndex}`);
            cellElement.style.backgroundColor = COLORS[cell];
         });
      });
      if (winner) {
         if (winner === 'T') {
            msgElement.innerHTML = `<span style="color:red"><strong>It's a Tie!</strong></span>`;
         } else {
            msgElement.innerHTML = `<span style="color:${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
         }
      } else {
         msgElement.innerHTML = `<span style="color:${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
      }
   }

   function setWinner () {
      let countColumns = board[0].length;
      for (let colIndex = 0 ; colIndex < board.length ; colIndex++) {
         for (let rowIndex = 0 ; rowIndex < board[colIndex].length ; rowIndex++) {
               winner = 
                  checkUp   (colIndex, rowIndex)    || 
                  checkRight(colIndex, rowIndex)    || 
                  checkDiag (colIndex, rowIndex, 1) ||
                  checkDiag (colIndex, rowIndex, -1);
               if (winner) break;
               if (board[board[0].length-1][rowIndex] !== 0) {
                  countColumns -= 1;
               break;
            }
         }
         if (winner) break;
         
      }
      if (!winner && countColumns === -1) winner = "T";
   }

   // transpose
      // function transpose(objectArray) {
      //    const countRows = board[0].length-1;
      //    const countColumns = board.length-1;
      //    let newBoard = [];
      //    for (let column = countColumns ; column >= 0 ; column--) {
      //       let newArray = [];
      //       for (let row = 0 ; row <= countRows ; row++) {   
      //          newArray.push(board[column][row]);   
      //       }
      //       newBoard.push(newArray);
      //    }
      //    return newBoard;
      // }

   function checkUp (columnIndex, rowIndex) {
      if (columnIndex > 2 ) return null;      
      return Math.abs(board[columnIndex][rowIndex] + board[columnIndex+1][rowIndex] + board[columnIndex+2][rowIndex] + board[columnIndex+3][rowIndex]) === 4 ? turn : null;
   }

   function checkRight (columnIndex, rowIndex) {
      if (rowIndex > 3) return null;
      return Math.abs(board[columnIndex][rowIndex] + board[columnIndex][rowIndex+1] + board[columnIndex][rowIndex+2] + board[columnIndex][rowIndex+3]) === 4 ? turn : null;
   }

   function checkDiag (columnIndex, rowIndex, offset) {
      if (offset > 0) {
         if (columnIndex > 2 || rowIndex > 3) return null;
      } else {
         if (columnIndex > 3 || rowIndex > 3) return null;
      }
      return Math.abs(board[columnIndex][rowIndex] + board[columnIndex+1][rowIndex+offset*1] + board[columnIndex+2][rowIndex+offset*2] + board[columnIndex+3][rowIndex+offset*3]) === 4 ? turn : null;
   }

   function handleMarkerClick () {
      const markerElement = event.target;
      
      const columnIndex = parseInt(markerElement.id.replace("col", ""));
      if (isNaN(columnIndex) || winner) return;

      const rowIndex = board[columnIndex].indexOf(0);
      if (rowIndex === -1) return;
      
      board[columnIndex][rowIndex] = turn;
      setWinner();
      turn *= -1;
      render();
   }
//! =============================================== Start
   document.getElementById("markers").addEventListener("click", handleMarkerClick);
   init();
