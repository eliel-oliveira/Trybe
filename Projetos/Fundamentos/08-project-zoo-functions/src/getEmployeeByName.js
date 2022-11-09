const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  let employe = {};
  employe = employees.find((name) => name
    .firstName === employeeName || name.lastName === employeeName);
  if (employe === undefined) employe = {};
  return employe;
}

module.exports = getEmployeeByName;
