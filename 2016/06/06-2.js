"use strict"
const fs = require('fs');

const getLetterCounts = ( counts, line ) => {
    for ( const pos in line ) {
        let letter = line[pos];

        if( counts[pos] == null ) {
            counts[pos] = { [letter]: 1 };

        } else if( counts[pos][letter] == null ) {
            counts[pos][letter] = 1;
            
        } else {
            counts[pos][letter]++;
        }
    }

    return counts;
}

const getMessageFromCounts = ( message, letterPos ) => {
    let topLetter = "";
    
    for ( const letter of Object.keys(letterPos) ) {
        if( topLetter === "" || letterPos[letter] < letterPos[topLetter] ) {
            topLetter = letter;
        }
    }

    return message + topLetter;
} 

const getMessage = lines => {
    let letterCountMap = lines.reduce(getLetterCounts, []);
    return letterCountMap.reduce(getMessageFromCounts, "");
}

fs.readFile('./input-q6.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split("\n");
  let message = getMessage(lines);
  console.log(message);
});