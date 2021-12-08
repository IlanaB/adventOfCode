const processData = require('../helpers').processData;

const solver = (data) => {
  const arr = data.split(',').map(Number).sort();
  const groups = arr.reduce((obj, n) => ({
    ...obj,
    [n]: obj[n] ? obj[n] + 1 : 1
  }), {});
  const groupKeys = Object.keys(groups);

  const min = arr[0];
  const max = arr[arr.length - 1];
  let best = {pos: '', distance: 9999999999999999999};

  for (let pos = min; pos <= max; pos++) {
    const distance = groupKeys.reduce((total, groupKey) => 
      total + (Math.abs(groupKey - pos) * groups[groupKey]), 0);

    if (best.distance > distance) {
      best = {pos, distance};
    }
  }

  return best;
}

processData("07/input.txt", solver);
