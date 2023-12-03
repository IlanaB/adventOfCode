const fs = require('fs').promises;
const path = require('path');

const getInput = (dir) => fs.readFile(path.join(__dirname, dir), 'utf8');

const processData = async (dir, fn) => {
  const data = await getInput(dir);
  console.log(fn(data.split('\n')));
}

module.exports = {
  getInput,
  processData
};