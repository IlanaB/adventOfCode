"use strict"
const fs = require('fs');
const sslRegex = /([a-z])(?!\1)([a-z])\1[a-z]*\[[a-z\[\]]*\[[a-z]*\2\1\2/i;
const sslRegex2 = /\[[a-z]*([a-z])(?!\1)([a-z])\1[a-z\[\]]*[\]][a-z]*\2\1\2/i;

const testLine = line => {
    console.log(line);
    console.log(sslRegex.test(line) || sslRegex2.test(line));
    return sslRegex.test(line) || sslRegex2.test(line);
}

// 158 too low
// 289 too high
fs.readFile('./input-q7.txt', 'utf8', (err, data) => {
  const lines = data.split("\n");
  console.log(lines.filter(testLine).length);
});