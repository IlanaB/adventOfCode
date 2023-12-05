const processData = require('../helpers').processData;

function solver(input) {
  let sum = 0;
  let currentNumberAsString = '';
  const gearTracker = {};

  function addNumToGear(gearRow, gearCol, value) {
    const key = `${gearRow},${gearCol}`;
    gearTracker[key] = [...(gearTracker[key] || []), Number(value)];
  }

  function saveNumber(numEndRow, numEndColumn) {
    const columnsToCheck = [];

    for (let i = 0; i < currentNumberAsString.length + 2; i++) {
      const columnToCheck = numEndColumn - currentNumberAsString.length + i;
      if (columnToCheck >= 0 && columnToCheck < input[numEndRow].length) {
        columnsToCheck.push(columnToCheck);
      }
    }


    if (numEndRow > 0) {
      for (col of columnsToCheck) {
        const checkValue = input[numEndRow - 1][col];
        if (checkValue === '*') {
          addNumToGear(numEndRow - 1, col, currentNumberAsString);
        }
      }
    }

    if (columnsToCheck[0] <= numEndColumn - currentNumberAsString.length) {
      const checkValueBefore = input[numEndRow][columnsToCheck[0]];
      if (checkValueBefore === '*') {
        addNumToGear(numEndRow, columnsToCheck[0], currentNumberAsString);
      }
    }


    if (columnsToCheck[columnsToCheck.length - 1] > numEndColumn) {
      const checkValueAfter = input[numEndRow][numEndColumn + 1];
      if (checkValueAfter === '*') {
        addNumToGear(numEndRow, numEndColumn + 1, currentNumberAsString);
      }
    }
    
    if (numEndRow < input.length - 1) {
      for (col of columnsToCheck) {
        const checkValue = input[numEndRow + 1][col];
        if (checkValue === '*') {
          addNumToGear(numEndRow + 1, col, currentNumberAsString);
        }
      }
    }

    currentNumberAsString = '';
  }

  input.forEach((line, rowIndex) => {
    line.split('').forEach((char, colIndex) => {
      if (isNaN(char) && currentNumberAsString !== '') {
        saveNumber(rowIndex, colIndex - 1);
      } else if (!isNaN(char)) {
        currentNumberAsString += char;
      }
    });

    if (currentNumberAsString !== '') {
      saveNumber(rowIndex, line.length - 1);
    }
  });

  return Object.values(gearTracker).reduce((sum, gearValues) => 
    sum + (gearValues.length === 2 ? 
      gearValues[0] * gearValues[1] : 0), 0)
}

processData("03/input.txt", solver);