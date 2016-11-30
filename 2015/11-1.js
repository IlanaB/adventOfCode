"use strict"

const pattern = "vzbxkghb";

const countStraights = password  => {
    let straights = 0;
    let lastCharCode = null;
    let currentCount = 0;

    for( const letter of password ) {
        let charCode = letter.charCodeAt(0);

        if(lastCharCode != null && lastCharCode === ( charCode - 1 )) {
            currentCount++;

            if(currentCount === 3) {
                lastCharCode = null;
                currentCount = 0;
                straights++;
            }
        } else {
            currentCount = 0;
            lastCharCode = lastCharCode;
        }
    }

    return straights;
}

const testPassword = password => {
    let straights = countStraights(password);
    let badLetters = password.match(/(i|o|l)/);
    let pairs = password.match(/(\w)\1{1}/g);

    console.log(straights >= 1);
    console.log(badLetters == null);
    console.log(pairs != null && pairs >= 2);
    return true;

    return (straights >= 1 && badLetters == null && pairs != null && pairs >= 2);
}

const getIncrease = ( passwordChars, pos ) => {
    let newCharCode = (passwordChars[pos].charCodeAt(0) + 1);
    
    if(newCharCode > 122) {
        passwordChars[pos] = "a";

        return getIncrease( 
            passwordChars.slice(),
            --pos
        )

    } else {
        passwordChars[pos] = String.fromCharCode(newCharCode);

        let newPassword = passwordChars.slice();
        while ( !testPassword(newPassword.join("")) ) {
            newPassword = getIncrease(newPassword, newPassword.length - 1);
        }

        return newPassword;
    }
}

console.log(getIncrease(pattern.split(""), pattern.length - 1).join(""));

