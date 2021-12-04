const processData = require('../helpers').processData;

const solver = (data) => {
  const lines = data.split("\n");
  const counts = new Array(lines[0].length).fill(0);

  lines.forEach((line) => {
    line.split("").forEach((char, i) => {
      
      if (char === '0') {
        counts[i]--;
      } else {
        counts[i]++;
      }
    });
  });

  const gamma = counts.reduce((b, a) => b + (a > 0 ? "1" : "0"), '');
  const epsilon = counts.reduce((b, a) => b + (a < 0 ? "1" : "0"), '');

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

processData("03/input.txt", solver);
