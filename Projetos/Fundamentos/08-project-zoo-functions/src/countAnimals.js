const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countAnimals(animal) {
  if (!animal) {
    return species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  const name = Object.values(animal)[0];
  const option = Object.values(animal)[1];
  if (!option) {
    return species.find((specie) => specie.name === name).residents.length;
  }
  return species.find((specie) => specie.name === name)
    .residents.filter((sex) => sex.sex === option).length;
}

module.exports = countAnimals;
