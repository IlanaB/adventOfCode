"use strict"
const fs = require('fs');

const getDecompressedLength = str => {
    let regex = /^([A-Z]*)\(([0-9]+)x([0-9]+)\)(.*)$/;
    let remainingStr = str;
    let matches = remainingStr.match(regex);
    let decompressedLength = 0;

    while(matches != null) {
        decompressedLength += (matches[1].length + Number(matches[2]) * Number(matches[3]));
        remainingStr = matches[4].slice(matches[2]);
        matches = remainingStr.match(regex);
    }

    return (decompressedLength + remainingStr.length);
}

fs.readFile('./input-q9.txt', 'utf8', (err, data) => {
    let str = data.replace(/\s/g,"");
    console.log(getDecompressedLength(str));
});