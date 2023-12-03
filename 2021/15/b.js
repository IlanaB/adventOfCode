const processData = require('../helpers').processData;

const getMap = (lines) => lines.split('\n').reduce((replacers, line) => {
  const [a,b] = line.split(' -> ');
  return {
    ...replacers,
    [a]: [a[0] + b, b + a[1]]
  };
}, {});

const solver = (data) => {
  const [start, lines] = data.split('\n\n');
  const replacers = getMap(lines);
  const startArr = start.split('');

  const firstChar = startArr[0];
  const lastChar = startArr[startArr.length - 1];

  let pairs = startArr.reduce((b, a, i) => {
    if ( i === 0 ) { return {} }
    const key = startArr[i-1] + a;
    return {
      ...b,
      [key]: (b[key] ? b[key] + 1 : 1)
    };
  }, {});

  for (let i = 0; i < 40; i++) {
    pairs = Object.keys(pairs).reduce((b, a) => ({
      ...b,
      [replacers[a][0]]: pairs[a] + (b[replacers[a][0]] || 0),
      [replacers[a][1]]: pairs[a] + (b[replacers[a][1]] || 0),
    }), {});
  }

  const entries = Object.entries(pairs).reduce((b, [key, count]) => {
    const [char1, char2 ] = key.split('');

    return {
      ...b,
      [char1]: (b[char1] || 0) + count,
      [char2]: (b[char2] || 0) + (char1 === char2 ? count * 2 : count)
    };
  }, {});

  entries[firstChar]++;
  entries[lastChar]++;

  for (key in entries) {
    entries[key] = entries[key] / 2;
  }

  const counts = Object.entries(entries).sort((a, b) => Number(a[1]) - Number(b[1]));

  return counts[counts.length - 1][1] - counts[0][1];
}

processData("14/input.txt", solver);
