const processData = require('../helpers').processData;

const solver = (data) => {
  const list = data.split("\n").map(Number);

  while (list.length) {
    // remove the item, we don't need to check it again
    const a = list.pop();

    for (let i = 0; i < list.length; i++) {
      const b = list[i];

      // get the last value we need
      const c = 2020 - (a + b);

      if (c >= 0 && list.includes(c)) {
        return a * b * c;
      }
    }
  }
}

processData("01/input.txt", solver);
