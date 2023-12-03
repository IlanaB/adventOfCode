const processData = require('../helpers').processData;

const reduceLine = line => {
  const arr = line.match(/[0-9]/g);
  return firstAndLast(arr);
}
const firstAndLast = (arr) => `${arr[0]}${arr[arr.length - 1]}`;
const addLine = (a,b) => Number(a) + Number(b);

function solver(input) {
  return input.map(reduceLine).reduce(addLine, 0);
}

processData("01/input.txt", solver);