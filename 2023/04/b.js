const processData = require('../helpers').processData;
const regex = /Card [0-9]+\: /;


function getNumberOfMatches(line) {
  const [winners, picks] = line.replace(regex, '').split(' | ').map(str => str.split(' '));
  
  return picks.reduce((sum, pick) => {
    if (pick === '') { return sum }
    
    return sum + (winners.includes(pick) ? 1 : 0)
  }, 0);
}

function solver(input) {
  const cardCounts = input
    .reduce((counts, line, currentIndex) => {
      const numberOfMatches = getNumberOfMatches(line);

      for (let i = currentIndex + 1; i <= currentIndex + numberOfMatches; i++) {
        if(counts[i] >= 0) {
          counts[i] += counts[currentIndex];
        }
      }

      return counts;
    }, Array(input.length).fill(1));
  
  return cardCounts.reduce((sum, val) => sum + val);
}

processData("04/input.txt", solver);