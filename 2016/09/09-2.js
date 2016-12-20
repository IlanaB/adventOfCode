"use strict"
const fs = require('fs');
const matchNext = /^([A-Z]*)\(([0-9]+)x([0-9]+)\)(.*)$/;
const isBasic = /^[A-Z]+$/;

const convertStringToBits = str => {
    return str.replace(/([A-Z]+)/g, (match) => match.length);
}

const getDecompressedLength = str => {
    let remainingStr = str;
    let matches = remainingStr.match(matchNext);
    let decompressedLength = 0;

    while(matches != null) {
        let length = matches[2];
        let count = matches[3];
        let repeater = matches[4].slice(0, length);
        decompressedLength += (matches[1].length + getChunkLength(length, count, repeater));
        remainingStr = matches[4].slice(length);
        matches = remainingStr.match(matchNext);
    }

    return (decompressedLength + remainingStr.length);
}

const getChunkLength = (length, count, str) => {
    let sum = 0;

    if(isBasic.test(str)) {
        sum = str.length * count;
    } else {
        sum = getDecompressedLength(str) * count
    }

    return sum;
}

fs.readFile('./input-q9.txt', 'utf8', (err, data) => {
    let str = data.replace(/\s/g,"");
    console.log(getDecompressedLength(str));
});