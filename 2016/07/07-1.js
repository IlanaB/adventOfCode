"use strict"
const fs = require('fs');
const hypernetRegex = /\[[a-z]*([a-z])(?!\1)([a-z])\2\1[a-z]*\]/i;
const abbaRegex = /([a-z])(?!\1)([a-z])\2\1/i;

const testLine = line => {
    return abbaRegex.test(line) && !hypernetRegex.test(line);
}

fs.readFile('./input-q7.txt', 'utf8', (err, data) => {
  const lines = data.split("\n");
  console.log(lines.filter(testLine).length);
});