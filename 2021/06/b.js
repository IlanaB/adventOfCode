const processData = require('../helpers').processData;

const solver = (data) => {
  const initialState = data.split(',');

  let counts = initialState.reduce((tally, days) => {
    tally[Number(days)]++;
    return tally;
  }, new Array(9).fill(0));

  for (let i = 0; i < 256; i++) {
    const births = counts[0];

    counts = [
      ...counts.slice(1, 7),
      counts[7] + births,
      counts[8],
      births
    ];
  }

  return counts.reduce((sum, count) => sum + count);
}

processData("06/input.txt", solver);
