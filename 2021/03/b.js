const processData = require('../helpers').processData;

const filterLines = (lines, pos, type = 'o2') => {
  const counts = [0,0];

  lines.forEach(line => {
    if (line[pos] === '1') {
      counts[1]++;
    } else {
      counts[0]++;
    }
  });

  let winner;
  if (type === 'o2') {
    winner = counts[0] > counts[1] ? '0' : '1';
  } else {
    winner = counts[0] <= counts[1] ? '0' : '1';
  }

  return lines.filter(line => line[pos] === winner);
}

const solver = (data) => {
  const lines = data.split("\n");
  let o2Lines = [...lines];
  let co2Lines = [...lines];
  let pos = 0;

  while (o2Lines.length > 1) {
    o2Lines = filterLines(o2Lines, pos, 'o2');
    pos++;
  }

  pos = 0;

  while (co2Lines.length > 1) {
    co2Lines = filterLines(co2Lines, pos, 'co2');
    pos++;
  }

  return parseInt(o2Lines[0], 2) * parseInt(co2Lines, 2);
}

processData("03/input.txt", solver);
