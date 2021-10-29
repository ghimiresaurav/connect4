import { checkWin } from "./modules/win.js";
import { Column, Cell, Checker, checkerCount } from "./modules/classes.js";

const gameBoard = document.getElementById("game-board");
const columns = [];
const cells = [[], [], [], [], [], []]; //6*7 matrix

for (let i = 0; i < 7; i++) {
  columns.push(new Column()); //add 7 instances of "Column" in the array
  cells.forEach((elem) => elem.push(new Cell())); //add an instance of "Cell" in each array
}

const play = (column) => {
  if (columns[column].isFull) {
    return "can't add checker, column already full";
  } else {
    const checkerColor = checkerCount % 2 == 0 ? "red" : "yellow";
    const ch = new Checker(checkerColor);
    const row = 5 - columns[column].getCheckerCount();

    cells[row][column].occupy(checkerColor);
    columns[column].addChecker();
    ch.render(row, column);

    //check for wins after 7 checkers are used
    if (checkerCount >= 7) {
      const gameStatus = checkWin({ row, column, color: checkerColor }, cells);
      if (gameStatus.gameOver) {
        //remove event listener when a player wins
        gameBoard.removeEventListener("click", handleClick);
        console.log(`${gameStatus.winner} won`);
        gameStatus.winningCheckers.forEach((cellNumber) =>
          document
            .getElementById(`cell-${cellNumber}`)
            .firstElementChild.classList.add("animated")
        );

        document.getElementById("game-over-card").style.visibility = "visible";
        document.getElementById("game-over-card").style.opacity = 1;
        document.querySelector("h2").innerText =
          gameStatus.winner == "red" ? `Player1 won.` : `Player2 won.`;
        // setTimeout(
        //   alert(
        //
        //     1000
        //   )
        // );

        console.log(gameStatus.winningCheckers);
      }
    }
  }
};
const handleClick = (e) => {
  if (e.target.classList.contains("cells")) {
    //if user clicks on a cell, get it's id
    //the id is `cell-{row number}{column number}` such as `cell-13`, `cell-56`
    const cell_id = e.target.id //assume `cell-34`
      .split("-")[1]; //["cell", "34"][1] => "34"

    // const row_id = parseInt(cell_id.split("")[0]); //get row number by splitting the cell id and get first element
    const column_id = parseInt(cell_id.split("")[1]); //get column number by splitting the cell id and get last element

    play(column_id);
  }
};

gameBoard.addEventListener("click", handleClick);
