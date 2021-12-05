const processData = require('../helpers').processData;

const sorter = (a, b) => a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0];

const solver = (data) => {
  const lines = data.split("\n");

  const ventCoords = lines.map(line => {
    const [start, end] = line.split(' -> ');

    const sorted = [
      start.split(',').map(Number),
      end.split(',').map(Number)
    ].sort(sorter);

    return sorted;
  });

  const gridSize = ventCoords.reduce(
    ([maxX, maxY],
    [[vent1X, vent1Y], [vent2X, vent2Y]]) => 
      [Math.max(maxX, vent1X, vent2X), Math.max(maxY, vent1Y, vent2Y)], 
    [0,0]);

  const emptyGrid = new Array(gridSize[1] + 1)
    .fill([])
    .map(() => new Array(gridSize[0] + 1)
      .fill(0));

  const grid = ventCoords.reduce((vents, [start, end]) => {
    if(start[0] === end[0]) {
      for(let i = start[1]; i <= end[1]; i++) {
        vents[i][start[0]]++;
      }
    } else if (start[1] === end[1]) {
      for(let i = start[0]; i <= end[0]; i++) {
        vents[start[1]][i]++;
      }
    }

    return vents;
  }, emptyGrid);

  return grid.flat().filter(num => num > 1).length;
}

processData("05/input.txt", solver);
