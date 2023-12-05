const processData = require('../helpers').processData;
const regex = /Card [0-9]+\: /;

function addLineWinnings(line) {
  const [winners, picks] = line.replace(regex, '').split(' | ').map(str => str.split(' '));
  
  return picks.reduce((sum, pick) => {
    if (pick === '') { return sum }
    
    return winners.includes(pick) ? (sum ? sum * 2 : 1) : sum
  }, 0);
}

function solver(input) {
  return input.reduce((sum, line) => sum + addLineWinnings(line), 0);
}

processData("04/input.txt", solver);