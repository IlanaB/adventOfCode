// too high 1700864
// too low 226800

function solve(num) {
	debugger;
	var count = 0,
		houseNum = 500000,
		// houseNum = 1,
		isOdd = false;

	while(count < num) {

		if(houseNum > 600000) {
			console.log("houseNum too high");
			break;
		}

		houseNum++;
		count = houseNum*10 + 10;
		isOdd = houseNum%2 !== 0;

		if(isOdd) {
			elf = 3;
		} else {
			elf = 2;
		}

		while(elf <= houseNum/2) {
			if(houseNum%elf === 0) {
				count += elf * 10;
			}
			elf++;

			if(isOdd) {
				elf++;
			}
		} 
		// console.log(count);
	}

	console.log("count: " + count);

	return houseNum;
}

console.log("house: " + solve(34000000));
// console.log("house: " + solve(300));


// function solve(num) {
// 	var arr = [0,10],
// 		house = 1,
// 		count = 0,
// 		dividers = [],
// 		divider = 2;

// 	while(count < num) {
// 		house++;
// 		count = 0;
// 		dividers = [];
// 		divider = 2;

// 		if(house === 12) {
// 			debugger;
// 		}
		
// 		while(divider <= Math.floor(house/2)) {
// 			if(house%divider === 0 && dividers.filter(function(val){
// 				return (house/val)%divider === 0;
// 			}).length === 0) {
// 				dividers.push(divider);
// 			}
// 			divider++;
// 		}

// 		if(dividers.length) {
// 			for(var i = 0; i < dividers.length; i++) {
// 				count += arr[house/dividers[i]] - 10;
// 			}
// 		}

// 		count += 10 + 10*house;
// 		arr.push(count);
// 		console.log(count);
// 	}

// 	return house;
// }

// // console.log("house: " + solve(34000000));
// console.log("house: " + solve(180));
