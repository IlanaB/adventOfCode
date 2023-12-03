const processData = require('../helpers').processData;

const wordNumbers = {
  "one": 1,
  "two": 2, 
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

const regex = new RegExp(`(?=([0-9]|${Object.keys(wordNumbers).join('|')}))`,'g');
const getNum = (num) => wordNumbers[num] || num;

const reduceLine = line => {
  const arr = Array.from(line.matchAll(regex), m => m[1]);
  return firstAndLast(arr);
}
const firstAndLast = (arr) => Number(`${getNum(arr[0])}${getNum(arr[arr.length - 1])}`);
const addLine = (a, b) => a + b;

function solver(input) {
  return input.map(reduceLine).reduce(addLine, 0);
}

processData("01/input.txt", solver);