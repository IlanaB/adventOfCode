"use strict"

const pattern = "Faerun to Tristram = 65,Faerun to Tambi = 129,Faerun to Norrath = 144,Faerun to Snowdin = 71,Faerun to Straylight = 137,Faerun to AlphaCentauri = 3,Faerun to Arbre = 149,Tristram to Tambi = 63,Tristram to Norrath = 4,Tristram to Snowdin = 105,Tristram to Straylight = 125,Tristram to AlphaCentauri = 55,Tristram to Arbre = 14,Tambi to Norrath = 68,Tambi to Snowdin = 52,Tambi to Straylight = 65,Tambi to AlphaCentauri = 22,Tambi to Arbre = 143,Norrath to Snowdin = 8,Norrath to Straylight = 23,Norrath to AlphaCentauri = 136,Norrath to Arbre = 115,Snowdin to Straylight = 101,Snowdin to AlphaCentauri = 84,Snowdin to Arbre = 96,Straylight to AlphaCentauri = 107,Straylight to Arbre = 14,AlphaCentauri to Arbre = 46";
// const pattern = "London to Dublin = 464,London to Belfast = 518,Dublin to Belfast = 141";

const mapRoutes = routes => {
    let routeMap = {};

    for( let route of routes ) {
        let r = route.split(" ");

        if(routeMap[r[0]] == null) {
            routeMap[r[0]] = {};
        }
        routeMap[r[0]] = Object.assign({}, routeMap[r[0]], { [r[2]]: Number(r[4]) });

        if(routeMap[r[2]] == null) {
            routeMap[r[2]] = {};
        }
        routeMap[r[2]] = Object.assign({}, routeMap[r[2]], { [r[0]]: Number(r[4]) });
    }

    return routeMap;
}

const nextStep = ( map1, distanceTraveled, visited, start, end ) => {
    if( visited[end] != null ) { return false; };

    let newDistanceTraveled = distanceTraveled + map1[start][end];
    let newVisited = Object.assign({}, visited, {[end]: true});

    if( Object.keys(newVisited).length === totalPlaces ) {
        if (newDistanceTraveled > longestDistance) longestDistance = newDistanceTraveled;
        return false;
    }

    for( const newEnd of Object.keys(map1[end]) ) {
        nextStep(map1, newDistanceTraveled, newVisited, end, newEnd);
    }

}

let longestDistance = 0;
let map = mapRoutes(pattern.split(","));
const totalPlaces = Object.keys(map).length;

for( const start of Object.keys(map) ) {
    for( const end of Object.keys(map[start]) ) {
        nextStep(map, 0, {[start]: true}, start, end);
    }
}
console.log(longestDistance);

