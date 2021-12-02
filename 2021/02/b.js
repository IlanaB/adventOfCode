const processData = require('../helpers').processData;

const indexAndMultiplier = {
  forward: [0, 1],
  down: [2, 1],
  up: [2, -1]
}

const reducer = (position, instruction) => {
  const [operator, amount] = instruction.split(" ");
  const [index, multiplier] = indexAndMultiplier[operator];
  position[index]+= amount * multiplier;

  if (index === 0) {
    position[1]+= amount * position[2];
  }

  return position;
};

const solver = (data) => {
  const [distance, depth, _] = data.split("\n").reduce(reducer, [0, 0, 0]);
  return distance * depth;
}

processData("02/input.txt", solver);
