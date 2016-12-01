"use strict"

const pattern = "L2, L5, L5, R5, L2, L4, R1, R1, L4, R2, R1, L1, L4, R1, L4, L4, R5, R3, R1, L1, R1, L5, L1, R5, L4, R2, L5, L3, L3, R3, L3, R4, R4, L2, L5, R1, R2, L2, L1, R3, R4, L193, R3, L5, R45, L1, R4, R79, L5, L5, R5, R1, L4, R3, R3, L4, R185, L5, L3, L1, R5, L2, R1, R3, R2, L3, L4, L2, R2, L3, L2, L2, L3, L5, R3, R4, L5, R1, R2, L2, R4, R3, L4, L3, L1, R3, R2, R1, R1, L3, R4, L5, R2, R1, R3, L3, L2, L2, R2, R1, R2, R3, L3, L3, R4, L4, R4, R4, R4, L3, L1, L2, R5, R2, R2, R2, L4, L3, L4, R4, L5, L4, R2, L4, L4, R4, R1, R5, L2, L4, L5, L3, L2, L4, L4, R3, L3, L4, R1, L2, R3, L2, R1, R2, R5, L4, L2, L1, L3, R2, R3, L2, L1, L5, L2, L1, R4";

let currentDir = "N";

const dirMap = {
    "N": {
        "R": "E",
        "L": "W"
    },
    "S": {
        "R": "W",
        "L": "E"
    },
    "E": {
        "R": "S",
        "L": "N"
    },
    "W": {
        "R": "N",
        "L": "S"
    }
}

const changeMap = {
    "N": [0,1],
    "S": [0,-1],
    "E": [1,0],
    "W": [-1,0]
}

let result = pattern.split(", ").reduce((a,b) => {
    const [turn, count] = [b[0], b.slice(1)];
    currentDir = dirMap[currentDir][turn];
    return [a[0] + changeMap[currentDir][0] * +count, a[1] + changeMap[currentDir][1] * +count];
}, [0,0]);

console.log(Math.abs(result[0]) + Math.abs(result[1]));

