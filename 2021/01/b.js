const processData = require('../helpers').processData;

const reducer = (sum, current, i, arr) => {
  if (i < 3) {return sum}

  const a = Number(arr[i - 3]) + Number(arr[i - 2]) + Number(arr[i - 1]);
  const b = Number(arr[i - 2]) + Number(arr[i - 1]) + Number(current);

  return b > a ? sum + 1 : sum;
}

processData("01/input.txt", (data) => data.split("\n").reduce(reducer, 0));
