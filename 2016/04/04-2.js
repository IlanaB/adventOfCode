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
        if( a.value > b.value ) {
            return 1;
        } else {
            return -1;
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

const rotateChar = ( rotations, val ) => {
    let rotatedCharCode = val.charCodeAt(0) + rotations;
    let newCharCode;

    if( rotatedCharCode > 122 ) {
        let overZ = rotatedCharCode - 123;
        newCharCode = 97 + ( overZ % 26 );
    } else {
        newCharCode = rotatedCharCode;
    }

    return String.fromCharCode(newCharCode);
}

const getCharacter = ( rotations, val ) => {
    return ( val === "-" ) ? " " : rotateChar(rotations, val);
}

const decrypt = room => {
    let rotations = Number(room.match(/\d+/)[0]);
    let name = room.replace(/-[0-9]+\[[a-z]+\]/, "");
    let decryptedRoom = name.split("").map(getCharacter.bind(this, rotations));
    return decryptedRoom.join("");
}

fs.readFile('./input-q4.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split("\n");
  let rooms = lines.filter(isRealRoom);
  for ( const room of rooms ) {
    console.log(`${decrypt(room)} - ${room.match(/\d+/)[0]}`);
  }
});