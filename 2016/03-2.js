"use strict"
const fs = require('fs');

const addSides = ( total, side ) => total + side;

const isTriangleValid = sides => {
    let max = Math.max(...sides);
    return sides.reduce(addSides, -max) > max;
}

const getTriangles = sets => {
    return sets.filter(isTriangleValid);
}

const getRowNumbers = row => row.match(/(\d+)/g);
const getSides = ( grid, row, col ) => [Number(grid[row][col]), Number(grid[row + 1][col]), Number(grid[row + 2][col])]

const getSets = data => {
    let rows = data.split("\n");
    let numberRows = rows.map(getRowNumbers);
    let sets = [];
    let iterations = (rows.length/3 - 1);

    for( let i = 0; i <= iterations; i++) {
        let startRow = i * 3;
        sets.push(getSides(numberRows, startRow, 0));
        sets.push(getSides(numberRows, startRow, 1));
        sets.push(getSides(numberRows, startRow, 2));
    }
    return sets;
}

fs.readFile('./03.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let sets = getSets(data);
  let triangles = getTriangles(sets);
  console.log(triangles.length);
});