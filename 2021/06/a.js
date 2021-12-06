const processData = require('../helpers').processData;

const solver = (data) => {
  const initialState = data.split(',');
  let newState = [...initialState];

  for (let i = 0; i < 80; i++) {
    let babyCount = 0;

    newState = newState.map(daysLeft => {
      if (daysLeft === 0) {
        babyCount++;
        return 6;
      } else {
        return daysLeft - 1;
      }
    });

    if (babyCount > 0) {
      newState = [
        ...newState,
        ...(new Array(babyCount).fill(8))
      ];
    }

  }

  return newState.length;
}

processData("06/input.txt", solver);
