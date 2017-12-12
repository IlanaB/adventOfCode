"use strict"
const fs = require('fs');
const path = require('path');

const mapRows = (row) => {
  const arr = row
                .split(/\s/g)
                .map(n => Number(n));
  return Math.max(...arr) - Math.min(...arr);
}

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    const lines = data.split("\n");
    const sum = lines
                  .map(mapRows)
                  .reduce((a, b) => b + a, 0);
    console.log(sum);
});