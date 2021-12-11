const processData = require('../helpers').processData;

const basinMapper = (grid) => (row, col, basinId) => {
  if (!basinMap[row]) {
    basinMap[row] = [];
  }

  basinMap[row][col] = basinId;

  if(row !== 0 && !basinMap[row - 1][col] && grid[row - 1][col] !== 9) {
    mapBasin(row - 1, col);
  }

  if(row !== grid.length - 1 && (!basinMap[row + 1] || !basinMap[row + 1][col]) && grid[row + 1][col] !== 9) {
    mapBasin(row + 1, col);
  }

  if(col !== 0 && !basinMap[row][col - 1] && grid[row][col - 1] !== 9) {
    mapBasin(row, col - 1);
  }

  if(col !== grid[0].length - 1 && !basinMap[row][col + 1] && grid[row][col + 1] !== 9) {
    mapBasin(row, col + 1);
  }
}

const solver = (data) => {
  const arr = data.split('\n');
  const grid = arr.map(row => row.split('').map(Number));
  const basinMap = [];
  let basinId = 1;

  const mapBasin = basinMapper(grid);

  grid.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      if (!basinMap[rowIndex]) {
        basinMap[rowIndex] = [];
      } else if (basinMap[rowIndex][colIndex]) {
        return;
      }

      if (num === 9) {
        basinMap[rowIndex][colIndex] = 0;
        return;
      }

      mapBasin(rowIndex, colIndex);
      basinId++;
    });
  });

  const counts = basinMap.reduce((sizes, row) => {
    row.forEach(basinId => {
      if (!basinId) { return }

      if (sizes[basinId]) {
        sizes[basinId]++;
      } else {
        sizes[basinId] = 1;
      }
    });

    return sizes;
  }, {});

  return Object.values(counts)
    .sort((a, b) => a - b)
    .splice(-3)
    .reduce((b, a) => a * b);
}

processData("09/input.txt", solver);
