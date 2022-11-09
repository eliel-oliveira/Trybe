const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function allEmployes() {
  return employees.map((employe) => Object.values(employe).reduce((acc) => {
    acc.id = employe.id;
    acc.fullName = `${employe.firstName} ${employe.lastName}`;
    acc.species = species.filter((specie) => employe.responsibleFor.includes(specie.id))
      .map(({ name }) => name);
    acc.locations = species.filter((specie) => employe.responsibleFor.includes(specie.id))
      .map(({ location }) => location);
    return acc;
  }, {}));
}

function getEmployeesCoverage(input) {
  if (!input) {
    return allEmployes();
  } if (employees.some((employe) => employe
    .firstName === input.name || employe.lastName === input.name || employe.id === input.id)) {
    return allEmployes().filter((employe) => employe.id === input.id || employe
      .fullName.includes(input.name))[0];
  } throw new Error('Informações inválidas');
}

module.exports = getEmployeesCoverage;
