"use strict"
const fs = require('fs');
const path = require('path');

const getDivision = (row) => {
  for(const i in row) {
    for(const ii in row) {
      if( i !== ii && row[i]%row[ii] === 0) {
        return row[i]/row[ii];
      }
    }
  }
}

const mapRows = (row) => {
  const arr = row.split(/\s/g).map(n => Number(n));
  return getDivision(arr);
}

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    const lines = data.split("\n");
    const sum = lines
                  .map(mapRows)
                  .reduce((a, b) => b + a, 0);
    console.log(sum);
});