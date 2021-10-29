let iteration = 0;
// winningCheckers = [];

const checkVertical = (checker, cells, winningCheckers) => {
  let adjacentCheckers = 1;
  // winningCheckers.push(`${checker.row}${checker.column}`);
  for (let i = 1; i < 4; i++) {
    if (cells[checker.row + i][checker.column].checkerColor == checker.color) {
      adjacentCheckers++;
      winningCheckers.push(`${checker.row + i}${checker.column}`);
    }
  }
  return { adjacentCheckers, winningCheckers };
};

const checkHorizontal = (checker, cells, winningCheckers, adjacentCheckers) => {
  adjacentCheckers = adjacentCheckers ? adjacentCheckers : 1;
  let i = 1,
    dir = iteration % 2 == 0 ? 1 : -1,
    columnToCheck = checker.column + dir * i;

  while (columnToCheck >= 0 && columnToCheck <= 6) {
    if (
      cells[checker.row][columnToCheck].isOccupied &&
      cells[checker.row][columnToCheck].checkerColor == checker.color
    ) {
      adjacentCheckers++;
      winningCheckers.push(`${checker.row}${columnToCheck}`);
      if (adjacentCheckers == 4) break;
      i++;
      columnToCheck = checker.column + dir * i;
    } else break;
  }

  iteration++;
  if (adjacentCheckers == 4 || iteration % 2 == 0)
    return { adjacentCheckers, winningCheckers };
  else
    return checkHorizontal(checker, cells, winningCheckers, adjacentCheckers);
};

const checkDiagonalI = (checker, cells, winningCheckers, adjacentCheckers) => {
  // diagonal\
  adjacentCheckers = adjacentCheckers ? adjacentCheckers : 1;
  let i = 1,
    dir = iteration % 2 == 0 ? -1 : 1,
    rowToCheck = checker.row + dir * i,
    columnToCheck = checker.column + dir * i;
  while (
    rowToCheck >= 0 &&
    columnToCheck >= 0 &&
    rowToCheck <= 5 &&
    columnToCheck <= 6
  ) {
    if (
      cells[rowToCheck][columnToCheck].isOccupied &&
      cells[rowToCheck][columnToCheck].checkerColor == checker.color
    ) {
      adjacentCheckers++;
      winningCheckers.push(`${rowToCheck}${columnToCheck}`);
      if (adjacentCheckers == 4) break;
      i++;
      rowToCheck = checker.row + dir * i;
      columnToCheck = checker.column + dir * i;
    } else break;
  }
  iteration++;
  if (adjacentCheckers == 4 || iteration % 2 == 0)
    return { adjacentCheckers, winningCheckers };
  else return checkDiagonalI(checker, cells, winningCheckers, adjacentCheckers);
};

const checkDiagonalII = (checker, cells, winningCheckers, adjacentCheckers) => {
  //diagonal /
  adjacentCheckers = adjacentCheckers ? adjacentCheckers : 1;
  let i = 1,
    dir = iteration % 2 == 0 ? -1 : 1,
    rowToCheck = checker.row - dir * i,
    columnToCheck = checker.column + dir * i;

  while (
    rowToCheck >= 0 &&
    columnToCheck >= 0 &&
    rowToCheck <= 5 &&
    columnToCheck <= 6
  ) {
    if (
      cells[rowToCheck][columnToCheck].isOccupied &&
      cells[rowToCheck][columnToCheck].checkerColor == checker.color
    ) {
      adjacentCheckers++;
      winningCheckers.push(`${rowToCheck}${columnToCheck}`);
      if (adjacentCheckers == 4) break;
      i++;
      rowToCheck = checker.row - dir * i;
      columnToCheck = checker.column + dir * i;
    } else break;
  }
  iteration++;
  if (adjacentCheckers == 4 || iteration % 2 == 0)
    return { adjacentCheckers, winningCheckers };
  else
    return checkDiagonalII(checker, cells, winningCheckers, adjacentCheckers);
};

const checkWin = (checker, cells) => {
  // console.log("checking win");
  let result;

  //check vertical
  if (checker.row <= 2) {
    result = checkVertical(checker, cells, [`${checker.row}${checker.column}`]);
    if (result.adjacentCheckers == 4) {
      return {
        gameOver: true,
        winner: checker.color,
        winningCheckers: result.winningCheckers,
      };
    }
  }

  //check horizontal
  result = checkHorizontal(checker, cells, [`${checker.row}${checker.column}`]);
  if (result.adjacentCheckers == 4) {
    return {
      gameOver: true,
      winner: checker.color,
      winningCheckers: result.winningCheckers,
    };
  }

  result = checkDiagonalI(checker, cells, [`${checker.row}${checker.column}`]);
  if (result.adjacentCheckers == 4) {
    return {
      gameOver: true,
      winner: checker.color,
      winningCheckers: result.winningCheckers,
    };
  }

  result = checkDiagonalII(checker, cells, [`${checker.row}${checker.column}`]);
  if (result.adjacentCheckers == 4) {
    return {
      gameOver: true,
      winner: checker.color,
      winningCheckers: result.winningCheckers,
    };
  }
  return { gameOver: false };
};

export { checkWin };
