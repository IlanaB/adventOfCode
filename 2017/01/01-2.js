"use strict"
const fs = require('fs');
const path = require('path');

const getMatchingValue = (list, index) => {
  const nextIndex = index + list.length/2;
  return nextIndex < list.length ? list[nextIndex] : list[nextIndex - list.length];
}

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  const list = data.split("");

  const sum = list.reduce((sum, val, i) => {
    const next = getMatchingValue(list, i);
    return val === next ? sum + Number(val) : sum;
  }, 0);

  console.log(sum);
});