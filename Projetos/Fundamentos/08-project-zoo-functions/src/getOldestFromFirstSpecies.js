const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const animalID = employees.find((employe) => employe.id === id).responsibleFor[0];
  const animalSearch = species.find((specie) => specie.id === animalID).residents;
  let aux = 0;
  return animalSearch.reduce((acc, curr) => {
    if (curr.age > aux) {
      aux = curr.age;
      acc.splice(0, 1, curr.name);
      acc.splice(1, 1, curr.sex);
      acc.splice(2, 1, aux);
    }
    return acc;
  }, ['name', 'sex', 0]);
}

module.exports = getOldestFromFirstSpecies;
