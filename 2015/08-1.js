"use strict"
const fs = require('fs');

const decodeChar = ( a, b ) => {
    let charCode = parseInt(b, 16);
    return String.fromCharCode(charCode);
}

const getLiteralString = line => {
    let literal = line
        .replace(/^"(.*)"$/,"$1")
        .replace(/\\x[0-1][a-f0-9]/gi, "")
        .replace(/(\\x(20|7f|81|8d|8f|90|9d|a0|ad))/gi, "")
        .replace(/\\x([a-f2-9][a-f0-9])/gi, decodeChar)
        .replace(/\\"/g,"\"")
        .replace(/\\\\/g,"\\")
        .replace(/\s/g, "");

    // console.log(literal);
    // console.log(literal.length);

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