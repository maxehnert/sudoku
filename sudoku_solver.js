
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
