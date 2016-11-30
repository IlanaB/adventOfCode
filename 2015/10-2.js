"use strict"

const pattern = "3113322113";

const readLine = ( num, count ) => {
    if(count === 0) return num;

    let newNum = num.match(/(\d)\1*/g).reduce(( a,b ) => `${a}${b.length}${b[0]}`, "");
    return readLine(newNum, --count);
}

console.log(readLine(pattern, 50).length);

