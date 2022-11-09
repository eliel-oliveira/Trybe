const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const filterResident = (specieName, sorted, sex) => {
  const list = []; const aka = species.find(({ name }) => specieName[0] === name).residents;
  if (sex) { list.push(...aka.filter((genre) => genre.sex === sex)); } else { list.push(...aka); }
  return sorted ? list.map((animal) => animal.name).sort() : list.map((animal) => animal.name);
};

const filterSpecie = (sector, includeNames, sort, sex) => {
  const objFilter = species.filter(({ location }) => location === sector);
  if (includeNames) {
    return objFilter.reduce((acc, cur) => {
      acc.push({ [cur.name]: filterResident([cur.name], sort, sex) }); return acc;
    }, []);
  } return objFilter.map(({ name }) => name);
};

function getAnimalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  return species.reduce((acc, cur) => {
    acc[cur.location] = filterSpecie(cur.location, includeNames, sorted, sex); return acc;
  }, {});
}

module.exports = getAnimalMap;
