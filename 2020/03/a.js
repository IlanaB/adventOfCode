const processData = require('../helpers').processData;

const goSledding = ({pos, treeCount}, line) => {
  if (pos >= line.length) {
    pos -= line.length;
  }

  return {
    pos: pos + 3,
    treeCount: treeCount + (line[pos] === "#" ? 1 : 0)
  };
};

const solver = (data) => data
  .split("\n")
  .reduce(goSledding, {pos: 0, treeCount: 0})
  .treeCount;

processData("03/input.txt", solver);
