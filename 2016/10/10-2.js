"use strict"
const fs = require('fs');

const emptyBot = {
    values: [],
    low: null,
    high: null
}

const outputs = [];

const addValue = ( bot, value ) => {
    let newBot = ( bot == null ) ? Object.assign({}, emptyBot) : Object.assign({}, bot);

    newBot.values = [ ...newBot.values, value ];

    return newBot;
}

const addDestinations = ( bot, parts ) => {
    let destinations = {
        low: {
            type: parts[5],
            dest: parts[6]
        },
        high: {
            type: parts[10],
            dest: parts[11]
        }
    }

    return ( bot == null ) ? Object.assign({}, emptyBot, destinations ) : Object.assign({}, bot, destinations );
}

const mapLines = ( map, line ) => {
    let parts = line.split(" ");

    if( parts[0] === "value" ) {
        map[parts[5]] = addValue(map[parts[5]], parts[1]);
    } else {
        map[parts[1]] = addDestinations(map[parts[1]], parts);
    }

    return map;
}

const passNextValue = ( map, bot ) => {
    const newBot = Object.assign({}, map[bot], { values: [] });

    let low = Math.min(...map[bot].values);
    let high = Math.max(...map[bot].values);

    let lowDest = map[bot].low.dest;
    let highDest = map[bot].high.dest;

    if( map[bot].low.type === "bot" ) {
        map[lowDest] = addValue(map[lowDest], low);
    } else {
        outputs[lowDest] = (outputs[lowDest] == null) ? [ low ] : [ ...outputs[lowDest], low ];
    }

    if( map[bot].high.type === "bot" ) {
        map[highDest] = addValue(map[highDest], high);
    } else {
        outputs[highDest] = (outputs[highDest] == null) ? [ high ] : [ ...outputs[highDest], high ];
    }

    map[bot] = newBot;
    return passChips( map );
}

const passChips = ( map ) => {
    let bots = Object.keys(map);
    for( const bot of bots ) {
        if(map[bot].values.length === 2) {
            return passNextValue( map, bot);
            break;
        }
    }
}

fs.readFile('./input-q10.txt', 'utf8', (err, data) => {
    const lines = data.split("\n");
    const map = lines.reduce(mapLines, {});
    passChips(map);
    console.log(outputs[0] * outputs[1] * outputs[2]);
});