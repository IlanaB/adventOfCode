const processData = require('../helpers').processData;

// let cumulativeCosts = [0];

// const getCumulativeCost = (n) => {
//   let i = cumulativeCosts.length;

//   while (i <= n) {
//     cumulativeCosts[i] = cumulativeCosts[i - 1] + i;
//     i++;
//   }

//   return cumulativeCosts[n];
// }

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
    const distance = groupKeys.reduce((total, groupKey) => {
      const x = Math.abs(groupKey - pos);
      // const perCrab = getCumulativeCost(x);
      const perCrab = (x**2) / 2 + (1/2) * x;
      return total + (perCrab * groups[groupKey]);
    }, 0)

    if (best.distance > distance) {
      best = {pos, distance};
    }
  }

  return best;
}

processData("07/input.txt", solver);
