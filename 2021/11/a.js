const processData = require('../helpers').processData;

class Grid {
  constructor(start) {
    this.grid = start;
    this.flashes = 0;

    for (let i = 0; i < 100; i++) {
      this.step();
    }
  }

  flash(row, col) {
    // already flashed this turn
    if (this.grid[row][col] === 0) {
      return;
    }

    this.flashes++;
    this.grid[row][col] = 0;
    
    [-1, 0, +1].forEach(i => {
      [-1, 0, +1].forEach(ii => {
        if ((i === 0 && ii === 0) || 
          !(!!this.grid[row + i] && 
          !!this.grid[row + i][col + ii])) {
          return;
        }

        if (this.grid[row + i][col + ii] === 9) {
          this.flash(row + i, col + ii);
        } else {
          this.grid[row + i][col + ii]++;
        }
      });
    });
  }

  step() {
    this.grid.forEach((row, i) => 
      row.forEach((_, ii) => {
        this.grid[i][ii]++;
    }));

    this.grid.forEach((row, i) => 
      row.forEach((col, ii) => {
        if (col > 9) {
          this.flash(i, ii);
        }
    }));
  }
}

const solver = (data) => {
  const grid = data
    .split('\n')
    .map(row => row
      .split('')
      .map(Number));

  return new Grid(grid).flashes
}

processData("11/input.txt", solver);
