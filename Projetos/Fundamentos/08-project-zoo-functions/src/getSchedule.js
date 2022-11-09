const { species, hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAllHours() {
  return Object.keys(hours).reduce((acc, curr) => {
    const day = curr;
    acc[curr] = {
      officeHour: `Open from ${hours[day].open}am until ${hours[day].close}pm`,
      exhibition: species.reduce((array, specie) => {
        if (specie.availability.includes(day)) {
          array.push(specie.name);
        } return array;
      }, []) };
    acc.Monday = {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    };
    return acc;
  }, {});
}

function getSchedule(scheduleTarget) {
  if (species.some((specie) => specie.name === scheduleTarget)) {
    return species.find((specie) => specie.name === scheduleTarget).availability;
  }
  if (Object.keys(hours).includes(scheduleTarget)) {
    return { [scheduleTarget]: getAllHours()[scheduleTarget] };
  }
  return getAllHours();
}

module.exports = getSchedule;
