"use strict"
const fs = require('fs');

const decodeChar = ( a, b ) => {
    return String.fromCharCode(parseInt(b, 16));
}

const getLiteralString = line => {
    let literal = line
        .replace(/^"(.*)"$/,"$1")
        .replace(/\\x([a-f0-9]{2})/gi, decodeChar)
        .replace(/\\\\/g,"\\")
        .replace(/\\"/g,"\"")
        .replace(/\s/g, "");

    console.log(literal);

    return literal;        
}

const getTotalDifference = ( count, line ) => {
    return count + line.length - getLiteralString(line).length;
}

fs.readFile('./input-q8.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split("\n");
  let difference = lines.reduce(getTotalDifference, 0);
  console.log(difference);
});