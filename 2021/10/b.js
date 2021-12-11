const processData = require('../helpers').processData;

const POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const matchers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const solver = (data) => {
  const lines = data.split('\n');
  
  const illegalChars = lines.map(line => {
    const requiredClosures = [];

    for (let i = 0; i < line.length; i++) {
      if (line[i] in matchers) {
        requiredClosures.push(matchers[line[i]]);
      } else if (line[i] !== requiredClosures.pop()) {
        return undefined;
      }
    }

    return requiredClosures
      .reverse()
      .reduce((b, a) => (b * 5) + POINTS[a], 0);
  }).filter(Boolean);
  
  return illegalChars.sort((a, b) => a - b)[Math.floor(illegalChars.length / 2)];
}

processData("10/input.txt", solver);
