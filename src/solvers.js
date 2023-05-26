/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) { //n range: 1-8
  //fixme - return an array of arrays (ie matrix)
  /*
    i: a number
    o: a matrix
    c:
    e:
  */
  //create matrix
  let matrix = [];
  //create an array that has n positions

  for (let i = 0; i < n; i++) {
    //create a copy of empty row to be manipulated
    var filledRow = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        filledRow.push(1);
      } else {
        filledRow.push(0);
      }
    }
    // filledRow = filledRow.splice(i, 1, 1);
    // console.log('filledRow', filledRow);
    matrix.push(filledRow);
  }
  // console.log('matrix: ', matrix);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //n range: 1-8
  /*
    i: a number
    o: a number
    c:
    e:
  */
  var rookCount = 1;
  var solutionsCount = 1;
  while (rookCount <= n) {
    //if i was n, r3 = 2^2
    solutionsCount *= rookCount;
    rookCount++;
    // console.log('n, rookCount, solutionsCount', n, rookCount, solutionsCount);
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
};

var placePiece = function(col, n) {
  var row = [];
  for (let cell = 0; cell < n; cell++) {
    if (cell === col) {
      row.push(1);
    } else {
      row.push(0);
    }
  }
  return row;
};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { //n range: 0-7
  //fixme - return an array of arrays (ie matrix)
  /*
    i: a number
    o: a matrix
    c:
    e: n = 0 returns empty array
  */
  // if (n === 0 ) {
  //   return [];
  // } if (n === 1) {
  //   return [[1]];
  // }

  // var row = Math.floor(n / 2);
  // var col = n - 1;
  // let bottomHalf = [];
  // while (row < n) {
  //   bottomHalf.push(placePiece(col, n));
  //   row++;
  //   col -= 2;
  //   if (col < 0) {
  //     col += n;
  //   }
  // }
  // row = Math.floor(n / 2) - 1;
  // if (n % 2 === 1) {
  //   col = 1;
  // } else {
  //   col = 0;
  // }
  // topHalf = [];
  // while (row >= 0) {
  //   topHalf.unshift(placePiece(col, n));
  //       row--;
  //       col += 2;
  //       if (col > n) {
  //         col -= n;
  //       }
  // }
  // var solution = topHalf.concat(bottomHalf);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
  //create empty board
  let row = [];
  let baselineBoard = [];
  for (let i = 0; i < n; i++) {
    row.push(0);
  }
  for (let i = 0; i < n; i++) {
    baselineBoard.push(row);
  }
  baselineBoard.splice(2, 1, placePiece(0, n));

  var checkNextPiece = function(board) {
    //base case
    //p = 1 or 2
      //add piece closest to edge

    //recursive case
    //walk down each diagonal 2 squares
      //add square on either side to consideration
      //evaluation check (closest to edge)
      //pick best one, add piece to board
      //call itself on new board

  };




};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { //n range: 0-8
  var solutionCount = undefined; //fixme - return a number
  /*
    i: a number
    o: a number
    c:
    e: n = 0 returns 0
  */
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
