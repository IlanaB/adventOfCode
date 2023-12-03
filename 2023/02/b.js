const processData = require('../helpers').processData;

function normalizeLine(line) {
  const game = line.split(": ")[1];
  return game.split("; ");
}

function compareHand(obj, hand) {
  const colors = hand.split(', ');
    for (color of colors) {
      const [value, colorName] = color.split(' ');

      if(!(colorName in obj) || Number(value) > obj[colorName]) {
        obj[colorName] = Number(value);
      }
    }

    return obj
}


function addLine(sum, hands) {
  return sum + Object.values(hands
    .reduce(compareHand, {}))
    .reduce((a, b) => a * b, 1);
}

function solver(input) {
  return input
    .map(normalizeLine)
    .reduce(addLine, 0);
}

processData("02/input.txt", solver);