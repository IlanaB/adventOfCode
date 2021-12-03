const processData = require('../helpers').processData;

const generateSledHill = (rows) => ([x, y]) => {
  let currentX = 0;
  let treeCount = 0;

  for (let currentY = 0; currentY < rows.length; currentY += y) {
    if (currentX >= rows[currentY].length) {
      currentX -= rows[currentY].length;
    }

    treeCount += (rows[currentY][currentX] === "#" ? 1 : 0);
    currentX += x;
  }

  return treeCount;
}

const solver = (data) => {
  const rows = data.split("\n");
  const goSledding = generateSledHill(rows);

  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]
  .map(goSledding)
  .reduce((a, b) => a * b);
};

processData("03/input.txt", solver);
