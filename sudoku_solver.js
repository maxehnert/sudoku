
module.exports.parseBoard = function(board){
  // split the board at each new line, and use map to split each row into an array of chars
  return board.split('\n').map( function(row){
    // use map to convert the chars into ints
    return row.split('').map( function(num){
      return +num;
    });
  });
};

module.exports.saveEmptyPositions = function(board){
  // create an array to save the positions
  var emptyPositions = [];

  // check evert square in the puzzle for a zero
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      // if a zero is found, save that position
      if(board[i][j] === 0){
        emptyPositions.push([i,j]);
      }
    }
  }

  // return the empty positions
  return emptyPositions;
};

module.exports.checkRow = function(board, row, value){
  // iterate through every value in the row
  for(var i = 0; i < board[row].length; i++) {
    // if a match is found, return false
    if(board[row][i] === value){
      return false;
    }
  }
  // if no match was found return true
  return true;
};

module.exports.checkColumn = function(board, column, value){
  // iterate through every value in the column
  for(var i = 0; i < board.length; i++) {
    // if a match is found, return false
    if(board[i][column] === value){
      return false;
    }
  }
  // if not match was found, return true
  return true;
};

module.exports.check3x3Square = function(board, column, row, value){
  // save the upper left corner
  var columnCorner = 0,
  rowCorner = 0,
  squareSize = 3;

  // find the left most column
  while(column >= columnCorner + squareSize){
    columnCorner += squareSize;
  }

  // find the upper most row
  while(row >= rowCorner + squareSize){
    rowCorner += squareSize;
  }

  // Iterate through each row
  for(var i = rowCorner; i < rowCorner + squareSize; i++){
    // iterate through each column
    for(var j = columnCorner; j < columnCorner + squareSize; j++){
      // return flase is a match is found
      if(board[i][j] === value){
        return false;
      }
    }
  }
  // if no math was found, return true
  return true;
};

module.exports.checkValue = function(board, column, row, value){
  if(this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.check3x3Square(board, column, row, value)){
      return true;
    }
    else {
      return false;
    }
};

module.exports.solvePuzzle = function(board, emptyPositions){
  // variables to track our position in the solver
  var limit = 9,
      i, row, column, value, found;

  for(i = 0; i < emptyPositions.length;){

    row = emptyPositions[i][0];
    column = emptyPositions[i][1];

    // try the next value
    value = board[row][column] + 1;

    // was a valid number found?
    found = false;

    // keep trying new value until either the limit was rached or a valid value was found
    while(!found && value <= limit){

      // if a valid value is found, mark found true,
      // set the postion to the value, and move to the next position
      if(this.checkValue(board, column, row, value)){
        found = true;
        board[row][column] = value;
        i++;
      }
      // otherwise try the next value
      else{
        value++;
      }
    }
    // if no valid value ws found and the limit was reache, move back to the previous position
    if(!found){
      board[row][column] = 0;
      i--;
    }
  }

  // a solution is found so log it
  board.forEach( function(row){
    console.log(row.join());
  });

  // return the solution
  return board;
}

module.exports.solveSudoku = function(board){
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptyPositions(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptyPositions);
};
