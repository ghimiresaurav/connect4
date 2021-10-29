let checkerCount = 0;
class Column {
  constructor() {
    this.checkers = 0;
    this.isFull = false;
  }

  addChecker() {
    if (!this.isFull) this.checkers += 1;
    if (this.checkers == 6) this.isFull = true;
  }

  getCheckerCount() {
    return this.checkers;
  }
}

class Cell {
  constructor() {
    this.isOccupied = false;
    this.checkerColor = null;
  }

  occupy(color) {
    if (!this.isOccupied) {
      this.isOccupied = true;
      this.checkerColor = color;
    } else return "Cell occupied";
  }
}

class Checker {
  constructor(color) {
    this.color = color;
    checkerCount += 1;
  }

  render(r, c) {
    // console.log(`row: `, r, "column: ", c);
    const checker = document.createElement("div");
    checker.classList.add("checkers");
    checker.classList.add(`${this.color}`);
    // checker.id = `checker-${this.color}`;
    document.getElementById(`cell-${r}${c}`).appendChild(checker);
  }
}

export { Column, Cell, Checker, checkerCount };
