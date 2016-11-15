"use strict"
var md5 = require('md5');

const pattern = "iwrupvqb";
let num = 0;

while( md5(pattern + num).slice(0,6) !== "000000" ) {
	num++;
}

console.log(num);


