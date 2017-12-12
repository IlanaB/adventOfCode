"use strict"
const fs = require('fs');
const path = require('path');

const valueToAdd = (n1, n2) => n1 === n2 ? Number(n1) : 0

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  const list = data.split("");
  let sum = 0;

  // skip the first
  for(let i = 1; i < list.length; i++) {
    sum += valueToAdd(list[i], list[i - 1]);
  }

  // account for first and last
  sum += valueToAdd(list[0], list[list.length - 1]);

  console.log(sum);
});