"use strict"
const fs = require('fs');

const emptyBot = {
    values: [],
    low: null,
    high: null
}

const addValue = ( bot, value ) => {
    let newBot = ( bot == null ) ? Object.assign({}, emptyBot) : Object.assign({}, bot);

    newBot.values = [ ...newBot.values, value ];

    return newBot;
}

const addDestinations = ( bot, parts ) => {
    let destinations = {
        low: parts[5] === "bot" ? parts[6] : null,
        high: parts[10] === "bot" ? parts[11] : null
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

const passNextValue = ( map, bot, low, high ) => {
    const newBot = Object.assign({}, map[bot], { values: [] });

    map[map[bot].low] = addValue(map[map[bot].low], Math.min(...map[bot].values));
    map[map[bot].high] = addValue(map[map[bot].high], Math.max(...map[bot].values));
    map[bot] = newBot;

    return getBotByComparison( map, low, high);
}

const getBotByComparison = ( map, low, high ) => {
    let bots = Object.keys(map);
    for( const bot of bots ) {
        if(map[bot].values.length === 2) {
            if(Math.min(...map[bot].values) === low && Math.max(...map[bot].values) === high) {
                return bot;
            } else {
                return passNextValue( map, bot, low, high);
            }
            break;
        }
    }
}

fs.readFile('./input-q10.txt', 'utf8', (err, data) => {
    const lines = data.split("\n");
    const map = lines.reduce(mapLines, {});
    const bot = getBotByComparison(map, 17, 61);
    console.log(bot);
});