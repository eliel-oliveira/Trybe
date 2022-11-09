import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getStarwarsApi from '../services/getStarwarsApi';

function PlanetsProvider({ children }) {
  const [apiStarwars, setStarwarsApi] = useState([]);
  const [starwarsList, setstarwarsList] = useState([]);
  const [filterByName, setFilter] = useState({ name: '' });
  const [
    filterByNumericValues,
    setfilterByNumericValues] = useState([]);

  async function requestStarwarsApi() {
    const starwarsApi = await getStarwarsApi();
    setStarwarsApi(starwarsApi);
    setstarwarsList(starwarsApi);
  }

  useEffect(() => {
    requestStarwarsApi();
  }, []);

  // atualiza lista a ser renderizada no componte table
  useEffect(() => {
    let apiResults = [...apiStarwars];
    // console.log('useEffect', filterByNumericValues);
    const filterArray = [...filterByNumericValues];
    filterArray.forEach((item) => {
      if (item.comparison === 'maior que') {
        apiResults = apiResults
          .filter((element) => Number(element[item.column]) > Number(item.value));
      } if (item.comparison === 'menor que') {
        apiResults = apiResults
          .filter((element) => Number(element[item.column]) < Number(item.value));
      } if (item.comparison === 'igual a') {
        apiResults = apiResults
          .filter((element) => Number(element[item.column]) === Number(item.value));
      }
    });
    setstarwarsList(apiResults);
  }, [apiStarwars, filterByNumericValues]);

  return (
    <PlanetsContext.Provider
      value={ { apiStarwars,
        filterByName,
        setFilter,
        filterByNumericValues,
        setfilterByNumericValues,
        setStarwarsApi,
        starwarsList,
        setstarwarsList } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default PlanetsProvider;
