const processData = require('../helpers').processData;

const calculateFoldPosition = (
  instructions,
  startX,
  startY) => instructions.reduce(([x, y], line) => {

  const [_, axis, n] = line.match(/([xy])=([\d]*)/);

  if (axis === 'x' && x > n) {
    return [n - (x - n), y];
  }

  if (axis === 'y' && y > n) {
    return [x, n - (y - n)];
  }
  
  return [x, y];
}, [startX, startY]);

const solver = (data) => {
  const [coords, instructions] = data
    .split('\n\n')
    .map(arr => arr.split('\n'));

  const dots = {};

  coords.forEach(line => {
    let [x,y] = line.split(',').map(Number);

    ([x, y] = calculateFoldPosition(instructions, x, y));

    dots[`${x},${y}`] = [x,y];
  });

  const mapped = Object.values(dots).reduce((b, [x, y]) => {
    if (!b[y]) {
      b[y] = [];
    }

    b[y][x] = '#';
    return b;
  },[]);

  return mapped
    .map(row => Array.from(row, val => val || ' ')
    .join(''));
}

processData("13/input.txt", solver);
