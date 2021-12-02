const processData = require('../helpers').processData;

const indexAndMultiplier = {
  forward: [0, 1],
  down: [1, 1],
  up: [1, -1]
}

const reducer = (position, instruction) => {
  const [operator, amount] = instruction.split(" ");
  const [index, multiplier] = indexAndMultiplier[operator];
  position[index]+= amount * multiplier;
  return position;
};

const solver = (data) => {
  const [distance, depth] = data.split("\n").reduce(reducer, [0, 0]);
  return distance * depth;
}

processData("02/input.txt", solver);
