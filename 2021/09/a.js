const processData = require('../helpers').processData;

const solver = (data) => {
  const arr = data.split('\n');
  const grid = arr.map(row => row.split('').map(Number));

  let total = 0;

  grid.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      const isLowest = [rowIndex - 1, rowIndex, rowIndex + 1].every(i => 
        [colIndex - 1, colIndex, colIndex + 1].every(ii => {
          if (i === rowIndex && ii === colIndex) { return true }

          return i < 0 || 
            i >= grid.length ||
            ii < 0 || 
            ii >= row.length || 
            num < grid[i][ii];
        }));

      if (isLowest) {
        total += 1 + num;
      }
    });
  });

  return total;
}

processData("09/input.txt", solver);
