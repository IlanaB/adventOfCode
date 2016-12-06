"use strict"
var md5 = require('md5');

const pattern = "ffykfhsq";
let num = 0;
let code = [];
let count = 0;

while ( count < 8 ) {
    let hash = md5(pattern + num);
    if( hash.slice(0,5) === "00000" && hash[5] < 8 && code[hash[5]] == null ) {
        count++;
        code[hash[5]] = hash[6];
    }
    num++;
}

console.log(code.join(""));