const processData = require('../helpers').processData;

const regex = /(?<min>[\d]*)-(?<max>[\d]*) (?<char>[a-z]): (?<password>[a-z]*)/;

const checkPassword = line => {
  const {groups: {min, max, char, password}} = line.match(regex);
  const matches = password.match(new RegExp(char, 'g'));
  return matches !== null && matches.length >= min && matches.length <= max;
}

const solver = (data) => data
  .split("\n")
  .filter(checkPassword)
  .length;

processData("02/input.txt", solver);
