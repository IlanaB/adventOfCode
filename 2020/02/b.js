const processData = require('../helpers').processData;

const regex = /(?<pos1>[\d]*)-(?<pos2>[\d]*) (?<char>[a-z]): (?<password>[a-z]*)/;

const checkPassword = line => {
  const {groups: {pos1, pos2, char, password}} = line.match(regex);
  const a = password[pos1 - 1];
  const b = password[pos2 - 1];
  return (a === char || b === char) && a !== b;
}

const solver = (data) => data
  .split("\n")
  .filter(checkPassword)
  .length;

processData("02/input.txt", solver);
