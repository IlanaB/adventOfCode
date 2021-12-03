const processData = require('../helpers').processData;

const solver = (data) => {
  const list = data.split("\n").map(Number);

  while (list.length) {
    // remove the item, we don't need to check it again
    const val = list.pop();

    // we know what number to look for
    const compliment = 2020 - val;

    if(list.includes(compliment)) {
      return val * compliment;
    }
  }
}

processData("01/input.txt", solver);
