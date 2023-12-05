const processData = require('../helpers').processData;

function solver(input) {
  let sum = 0;
  let currentNumberAsString = '';

  function validate(numEndRow, numEndColumn) {
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
        if (checkValue !== '.' && isNaN(checkValue)) {
          return true;
        }
      }
    }

    if (columnsToCheck[0] <= numEndColumn - currentNumberAsString.length) {
      const checkValueBefore = input[numEndRow][columnsToCheck[0]];
      if (checkValueBefore !== '.' && isNaN(checkValueBefore)) {
        return true;
      }
    }


    if (columnsToCheck[columnsToCheck.length - 1] > numEndColumn) {
      const checkValueAfter = input[numEndRow][numEndColumn + 1];
      if (checkValueAfter !== '.' && isNaN(checkValueAfter)) {
        return true;
      }
    }
    
    if (numEndRow < input.length - 1) {
      for (col of columnsToCheck) {
        const checkValue = input[numEndRow + 1][col];
        if (checkValue !== '.' && isNaN(checkValue)) {
          return true;
        }
      }
    }

    return false;
  }

  function saveNumber(rowIndex, colIndex) {
    if(validate(rowIndex, colIndex)) {
      sum += Number(currentNumberAsString);
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

  return sum;
}

processData("03/input.txt", solver);