const processData = require('../helpers').processData;

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
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
        return line[i];
      }
    }
  }).filter(Boolean);
  
  return illegalChars.reduce((b, a) => b + POINTS[a], 0);
}

processData("10/input.txt", solver);
