const processData = require('../helpers').processData;

let map;

const buildMap = lines => {
  map = lines
    .split('\n')
    .map(row => row
      .split('')
      .map(Number));
}

const nextStep = ({ path, cost }, dir) => {
  const lastSpot = path.slice(-1)[0];
  let spot;

  if ( dir === 'x' ) {
    if (lastSpot[0] === finalSpot[0]) { return }
    spot = [lastSpot[0] + 1, lastSpot[1]];
  } else {
    if (lastSpot[1] === finalSpot[1]) { return }
    spot = [lastSpot[0], lastSpot[1] + 1];
  }
  
  return {
    path: [...path, spot],
    cost: cost + map[spot[1]][spot[0]],
  };
}

const solver = (data) => {
  map = data
  return bestRoute;
}

processData("15/input.txt", solver);
