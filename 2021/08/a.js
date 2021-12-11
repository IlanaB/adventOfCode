const processData = require('../helpers').processData;

// const lineCounts = [6,2,5,5,4,5,6,3,7,6];
const uniqueLineCounts = {
  2: 1,
  4: 4,
  3: 7,
  7: 8
};

const normalizeEntries = list => list
  .split(' ')
  .map(entry => entry
    .split('')
    .sort()
    .join(''));

const solver = (data) => {
  const arr = data.split('\n');
  const keys = {};

  const outputs = arr.map(line => {
    const [hints, outputs] = line.split(' | ').map(normalizeEntries);
    
    hints.forEach(hint => {
      if(uniqueLineCounts[hint.length]) {
        keys[hint] = uniqueLineCounts[hint.length];
      }
    });

    return outputs;
  }).flat();

  return outputs.filter(line => Object.keys(keys).includes(line)).length;
}

processData("08/input.txt", solver);
