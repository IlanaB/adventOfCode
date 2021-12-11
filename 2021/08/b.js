const processData = require('../helpers').processData;

const lineCounts = {
  2: [1],
  3: [7],
  4: [4],
  5: [2,3,5],
  6: [0,6,9],
  7: [8],
};

const initiateLineCounts = () => JSON.parse(JSON.stringify(lineCounts));

const normalizeEntries = list => list
  .split(' ')
  .map(entry => entry
    .split('')
    .sort());

class LineDecoder {
  constructor(hints) {
    this.hints = hints;
    this.unsolvedLineCounts = initiateLineCounts();
    this.decoder = {};
    this.lookup = {};

    this.decode();
    console.log(this.unsolvedLineCounts, this.decoder);
  }

  decode() {
    this.getFinalOptions();
    this.solveForZero();
    this.solveForNine();
    this.getFinalOptions();
    this.solveForThree();
    this.solveForTwo();
    this.getFinalOptions();
  }

  getFinalOptions() {
    this.hints.forEach(hint => {
      if(!(hint.join('') in this.decoder) && this.unsolvedLineCounts[hint.length]?.length === 1) {
        this.decoder[hint.join('')] = this.unsolvedLineCounts[hint.length][0];
        this.lookup[this.unsolvedLineCounts[hint.length][0]] = hint;
        delete this.unsolvedLineCounts[hint.length];
      }
    });
  }

  // take the chars from 4, subtract chars from 1, and whichever character 
  // is most common across all numbers is the middle
  getMiddleChar() {
    if(this._middleChar) { return this._middleChar }

    const twoChars = this.lookup[4].filter(char => !this.lookup[1].includes(char));

    const counts = this.hints.reduce((counts, hint) => {
      if (hint.includes(twoChars[0])) {
        counts[0]++
      }

      if (hint.includes(twoChars[1])) {
        counts[1]++
      }

      return counts;
    }, [0, 0]);

    this._middleChar = counts[0] > counts[1] ? twoChars[0] : twoChars[1];
    return this._middleChar;
  }

  // remove the middle character from 8
  solveForZero() {
    const zero = this.lookup[8].filter(char => char !== this.getMiddleChar());
    this.decoder[zero.join('')] = 0;
    this.lookup[0] = zero;
    this.unsolvedLineCounts[zero.length] = this.unsolvedLineCounts[zero.length].filter(line => line !== 0);
  }

  // only 6 char option (excl 0) that includes all chars from 7
  solveForNine() {
    const nine = this.hints.find(hint => 
      hint.length === 6 &&
      hint.join('') !== this.lookup[0].join('') && 
      this.lookup[7].every(char => 
        hint.includes(char)));

    this.decoder[nine.join('')] = 9;
    this.lookup[9] = nine;
    this.unsolvedLineCounts[nine.length] = this.unsolvedLineCounts[nine.length].filter(line => line !== 9);
  }

  // only 5 char option that includes all chars from 7
  solveForThree() {
    const three = this.hints.find(hint => 
      hint.length === 5 &&
      this.lookup[7].every(char => 
        hint.includes(char)));

    this.decoder[three.join('')] = 3;
    this.lookup[3] = three;
    this.unsolvedLineCounts[three.length] = this.unsolvedLineCounts[three.length].filter(line => line !== 3);
  }

  // only option between 2 and 5 that has the only char missing from 6
  solveForTwo() {
    const missingCharIn6 = this.lookup[8].find(char => 
      !this.lookup[6].includes(char));

    const two = this.hints.find(hint => 
      !(hint.join('') in this.decoder) &&
      hint.includes(missingCharIn6));

    this.decoder[two.join('')] = 2;
    this.lookup[2] = two;
    this.unsolvedLineCounts[two.length] = this.unsolvedLineCounts[two.length].filter(line => line !== 2);
  }
}

const solver = (data) => {
  const arr = data.split('\n');

  const outputs = arr.map(line => {
    const [hints, outputs] = line.split(' | ').map(normalizeEntries);
    const decoder = (new LineDecoder(hints)).decoder;

    return Number(outputs.map(output => decoder[output.join('')]).join(''));
  });

  return outputs.reduce((b, a) => a + b);
}

processData("08/input.txt", solver);
