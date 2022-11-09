const data = require('../data/zoo_data');

function countEntrants(entrants) {
  let child = 0;
  let adult = 0;
  let senior = 0;
  return entrants.reduce((acc, curr) => {
    if (curr.age < 18) {
      child += 1;
      acc.child = child;
    } if (curr.age >= 18 && curr.age < 50) {
      adult += 1;
      acc.adult = adult;
    } if (curr.age >= 50) {
      senior += 1;
      acc.senior = senior;
    }
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  } const { child = 0, adult = 0, senior = 0 } = countEntrants(entrants);
  const total = child * 20.99 + adult * 49.99 + senior * 24.99;
  return total;
}

module.exports = { calculateEntry, countEntrants };
