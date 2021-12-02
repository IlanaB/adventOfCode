const processData = require('../helpers').processData;

const reducer = (sum, current, i, arr) => 
  Number(current) > Number(arr[i - 1]) ? sum + 1 : sum;
processData("01/input.txt", (data) => data.split("\n").reduce(reducer, 0));
