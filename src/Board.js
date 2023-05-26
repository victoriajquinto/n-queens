// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) { //return a boolean
      // fixme - return a boolean determined by a conditional
      /*
        i: # indicating row index
        o: boolean
        c:
        e: empty matrix

        S - determine if there are queens that can attack each other in a row
        J -
        E - if there is more than one queen in a row, there is a conflic
        V -
        var matrix = [
                    [0, 0, 0, 0], -- 0
                    [1, 1, 0, 0], -- x
                    [0, 0, 0, 0], -- 0
                    [0, 0, 0, 0]  -- 0
                  ];
        A -see pseudo
        V
        I
    */
      //pseudo:
      //given a row
      //count the number of 1's that appear in the row
      var count = 0;
      for (pos of this.get(rowIndex)) {
      //if count is equal to or less than one, return false (no conflict)
        if (pos) {
          count++;
        }
      //else return true (conflict exists)
      }
      return count > 1 ? true : false;
    },

    //refactor idea: convert array to string, use regex to find if there are multiple matches for 1

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      /*
      i: a number indicating column index
      o: a boolean - true = conflict exists, false = no conflict
      c:
      e:

      S - determine if there are queens that can attack each other in a column
      J -
      E - find if there are conflicts in any of the rows by iterating through all the rows and storing their returned booleans. use some() method to return final value - if any of the booleans are true, return true, otherwise, return false
      V -
      A -see pseudo
      V
      I
      n = this.get('n')

      var matrix = [
                    [0, 0, 0, 0], -- 0
                    [1, 1, 0, 0], -- x
                    [0, 0, 0, 0], -- 0
                    [0, 0, 0, 0]  -- 0
                  ];

                  let arrayOfBooleans = [false, true, false, false]
      */

      // pseudo:
      // iterate through the rows
      var n = this.get('n');
      for (var i = 0; i < n; i ++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      // perhaps store return value of each iteration in an array?
      // call hasRowConflictAt for each row
      // maybe use .some() array method for this:
      // if any of the rows return true,
      //   return true
      // else if all rows return false
      //   return false

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      /*
      i: a number indicating column index
      o: a boolean - true = conflict exists, false = no conflict
      c:
      e:

      S - determine if there are queens that can attack each other in a col
      J -
      E - transpose the column by gather all the values in each row at given col index and sticking them into a new array
      V -
       var matrix = [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 1, 0]
                     0  0  x  0 <-----
                  ];
      A -see pseudo
      V
      I

      */

      // pseudo:
      // iterate through the matrix using map to return an array full of booleans for each row. assign map's return value to a new variable - transposedCal
      // once loop has concluded,
      // apply some() to tranposedCol to determine if any true values exist in tranposedCol. if true exists -> return true, else return false
      var n = this.get('n');
      var count = 0;
      for (let row = 0; row < n; row++) {
        count += this.get(row)[colIndex]; //this.get(row)[colIndex]
      }
      return (count > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      /*
      i: a number indicating column index
      o: a boolean - true = conflict exists, false = no conflict
      c:
      e:

      S - determine if there are queens that can attack each other in a column
      J -
      E - find if there are conflicts in any of the rows by iterating through all the rows and storing their returned booleans. use some() method to return final value - if any of the booleans are true, return true, otherwise, return false
      V -
      A -see pseudo
      V
      I

      // pseudo:
      // create conflictsInCols empty array
      // go through the first element in the matrix and determine its length - this is n this.get('n')
      // iterate n times. i starts at 0 and indicates col #. call hasColConflictAt(i) until i reaches length. push return value into stored booleans array
      // apply some() to conflictsInCols to determine if any true values exist in conflictsInCols. if true exists -> return true, else return false
      // */
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right     &
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      /*
      i: col index in row 0???
      o: a boolean
      c:
      e:
      visualization:
      var matrix = [
                    [00, 01, 02, 03],
                    [10, 11, 12, 13],
                    [20, 21, 21, 23],
                    [30, 31, 32, 33]
                  ];
      */
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      var count = 0;


      for (rowIndex; rowIndex < n; rowIndex++) {
        var row = this.get(rowIndex);
        if (row[colIndex]) {
          count++;
        }
        colIndex++;
      }
      return (count > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var n = this.get('n');
      //range of (-n+2 to n-2);
      //go through all major diagonals
      for (var majorDiagonalIndex = -n + 2; majorDiagonalIndex < n - 2; majorDiagonalIndex ++) {
        if (this.hasMajorDiagonalConflictAt(majorDiagonalIndex)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left %
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');

      /*
      i: col index in row 0
      o: a boolean
      c:
      e:

      visualization: var matrix = [
                    [00, 01, 02, 03],
                    [10, 11, 12, 13],
                    [20, 21, 21, 23],
                    [30, 31, 32, 33]
                  ];

    //   pseudo:
    //   determine what n is by getting length of first row
    //   create an new array
    //  given col # in row 0
    //   check x, y for queen - push val in new array
    //   check x--, y-- for queen - push val in new array
    //   etc. until value at x, y is undefined
    //   check if new array has more than one value of 1
    //   if there are 2 or more 1's
    //     return true
    //   else return false

      */

      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      var count = 0;
      for (rowIndex; rowIndex < n; rowIndex++) {
        var row = this.get(rowIndex);
        if (row[colIndex]) {
          count++;
        }
        colIndex--;
      }
      return (count > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var n = this.get('n');
      for (var minorDiagonal = 1; minorDiagonal < n + 2; minorDiagonal++) {
        if (this.hasMinorDiagonalConflictAt(minorDiagonal)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
