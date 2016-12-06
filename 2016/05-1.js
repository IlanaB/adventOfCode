"use strict"
var md5 = require('md5');

const pattern = "ffykfhsq";
let num = 0;
let code = "";

while ( code.length < 8 ) {
    let hash = md5(pattern + num);
    if( hash.slice(0,5) === "00000" ) {
        code += hash[5];
    }
    num++;
}

console.log(code);