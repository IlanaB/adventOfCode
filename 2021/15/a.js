const processData = require('../helpers').processData;

let map;
let minLength;
let finalSpot;
let bestRoute = {
  cost: 999999999
};

const isComplete = (path) => {
  const lastSpot = path.slice(-1)[0];

  return lastSpot[0] === finalSpot[0] && 
    lastSpot[1] === finalSpot[1];
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
    .split('\n')
    .map(row => row
      .split('')
      .map(Number));

  minLength = map.length + map[0].length - 1;
  finalSpot = [map[0].length - 1, map.length - 1];

  let routes = [{
    path: [[0,0]],
    cost: 0
  }];
  
  while (routes.length > 0) {
    routes = routes.reduce((newRoutes, route) => {
      const newRoute1 = nextStep(route, 'y');
      const newRoute2 = nextStep(route, 'x');

      if (newRoute1 && isComplete(newRoute1.path) && newRoute1.cost < bestRoute.cost) {
        bestRoute = newRoute1;
      } 

      if (newRoute2 && isComplete(newRoute2.path) && newRoute2.cost < bestRoute.cost) {
        bestRoute = newRoute2;
      } 

      return [
        ...newRoutes,
        ...(newRoute1 && newRoute1.cost < bestRoute.cost ? [newRoute1] : []),
        ...(newRoute2 && newRoute2.cost < bestRoute.cost ? [newRoute2] : []),
      ]
    }, []);
  }

  return bestRoute;
}

processData("15/input.txt", solver);
