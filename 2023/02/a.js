const processData = require('../helpers').processData;

const limits = {
  'red': 12,
  'green': 13,
  'blue': 14
};

function normalizeLine(line) {
  const [game, result] = line.split(": ");
  const id = game.match('[0-9]+')[0];
  const results = result.split("; ");
  return [Number(id), results];
}

function isGameInvalid(game) {
  return game.split(', ').some(color => {
    const [num, colorName] = color.split(' ');
    return limits[colorName] < Number(num);
  })
}

function addLine(sum, [id, games]) {
  return games.some(isGameInvalid) ? sum : sum + id;
}

function solver(input) {
  return input.map(normalizeLine).reduce(addLine, 0);
}

processData("02/input.txt", solver);