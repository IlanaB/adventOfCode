"use strict"
const fs = require('fs');

const rotateX = ( grid, line ) =>  {
    let newGrid = Object.assign({}, grid);
    const row = line[2].split("=")[1];
    const dist = line[4];

    for( let i = 0; i < 50; i++ ) {
        let prevX = (i - dist);
        if(i - dist < 0) prevX += 50;
        newGrid[`${row},${i}`] = grid[`${row},${prevX}`] || false
    }

    return newGrid;
}

const rotateY = ( grid, line ) =>  {
    let newGrid = Object.assign({}, grid);
    const col = line[2].split("=")[1];
    const dist = line[4];

    for( let i = 0; i < 6; i++ ) {
        let prevY = (i - dist);
        if(i - dist < 0) prevY += 6;
        newGrid[`${i},${col}`] = grid[`${prevY},${col}`] || false
    }

    return newGrid;
}

const rotate = ( grid, line ) =>  {
    switch(line[1]) {
        case "row":
            return rotateX(grid, line);
            break;

        case "column":
            return rotateY(grid, line);
            break;

        default:
            console.log("error: no axis handler for " + line.join(" "));
    }
}

const rect = ( grid, line ) => {
    let newGrid = Object.assign({}, grid);
    let rect = line[1].split("x");

    for( let i = 0; i < Number(rect[1]); i++ ) {
        for( let ii = 0; ii < Number(rect[0]); ii++ ) {
            newGrid[`${i},${ii}`] = true;
        }
    }

    return newGrid;
}

const updateGrid = ( grid, line ) => {
    let lineParts = line.split(" ");
    switch(lineParts[0]) {
        case "rotate":
            return rotate(grid, lineParts);
            break;

        case "rect":
            return rect(grid, lineParts);
            break;

        default:
            console.log("error: no handler for " + line);
    }
}

const getLitCount = grid => {
    console.log(grid);
    return Object.keys(grid).reduce(( count, pixel ) => {
        return grid[pixel] ? ++count : count
    }, 0);
}

fs.readFile('./input-q8.txt', 'utf8', (err, data) => {
    const lines = data.split("\n");
    const grid = lines.reduce(updateGrid, {});
    console.log(getLitCount(grid));
});