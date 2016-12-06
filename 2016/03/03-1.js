"use strict"
const fs = require('fs');

const getTriangles = sets => {
    return sets.filter(set => {
        let sides = set.match(/(\d+)/g);
        let max = Math.max(...sides);
        return sides.reduce((a,b)=>(+a + +b), -max) > max;
    });
}

fs.readFile('./input-q3.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let triangles = getTriangles(data.split("\n"));
  console.log(triangles.length);
});