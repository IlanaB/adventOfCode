"use strict"
const fs = require('fs');

const getFirstFive = ( checkSum, letter ) => {
    if( checkSum.length < 5 ) {
        return checkSum + letter.value;
    } else {
        return checkSum;
    }
}

const sortTotals = ( a, b ) => {
    if ( a.total > b.total ) {
        return -1;
    } else if ( a.total < b.total ) {
        return 1;
    } else {
        if( a > b ) {
            return -1;
        } else {
            return 1;
        }
    }
}

const getLetterTotals = letters => {
    let totals = {};

    for ( const letter of letters ) {
        totals[letter] = totals[letter] == null ? 1 : ++totals[letter]; 
    }

    let array = Object.keys(totals).map(key => ({
        value: key,
        total: totals[key]
    }))

    return array;
}

const getCheckSum = ( letters ) => {
    let letterTotals = getLetterTotals(letters.replace(/-/g,""));
    let letterTotalsSorted = letterTotals.sort(sortTotals);
    return letterTotalsSorted.reduce(getFirstFive, "");
}

const isRealRoom = room => {
    let letters = room.match(/([a-z]+)-/g).join("");
    let calculatedCheckSum = getCheckSum(letters);
    let providedCheckSum = room.match(/\[(\w+)\]$/)[1];
    return (calculatedCheckSum === providedCheckSum);
}

const addCheckSum = ( total, room ) => {
    return total + Number(room.match(/\d+/)[0]);
}

fs.readFile('./04.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split("\n");
  let rooms = lines.filter(isRealRoom);
  // 10142 too low
  console.log(rooms.reduce(addCheckSum, 0));
});