const processData = require('../helpers').processData;

const getMap = (lines) => lines.split('\n').reduce((replacers, line) => {
  const [a,b] = line.split(' -> ');
  return {
    ...replacers,
    [a]: [a[0], b, a[1]],
  };
}, {});

const solver = (data) => {
  const [start, lines] = data.split('\n\n');
  const replacers = getMap(lines);
  let str = start.split('');

  for (let i = 0; i < 10; i++) {
    str = str.reduce(({newStr, lastChar}, c) => {
      if (!lastChar) { 
        return {
          lastChar: c,
          newStr: [c]
        }
      }

      return {
        newStr: [
          ...newStr.slice(0, -1),
          ...replacers[`${lastChar}${c}`]
        ],
        lastChar: c
      }
    }, {}).newStr;
  }

  const counts = Object.entries(str.reduce((counts, char) => ({
    ...counts,
    [char]: counts[char] ? counts[char] + 1 : 1
  }), {})).sort((a, b) => Number(a[1]) - Number(b[1]));

  return counts[counts.length - 1][1] - counts[0][1];
}

processData("14/input.txt", solver);
