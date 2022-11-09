const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  return species.filter(({
    name,
  }) => name === animal)[0].residents.every((animals) => animals.age >= age);
}

module.exports = getAnimalsOlderThan;
