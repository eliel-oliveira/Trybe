import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Sort from './Sort';

function Menu() {
  const { setFilter,
    filterByNumericValues,
    setfilterByNumericValues,
  } = useContext(PlanetsContext);

  // atualiza estado local handleChange do componente MENU
  const [handleChangeFilter, setHandleChangeFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0 });

  // array local com as options disponiveis para o select column
  const [optionColumn, setOptionColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  // função handleChange que atualiza o estado local handleChangeFilter
  const handleChangeFilterByNumericValues = ({ target }) => {
    const payload = { ...handleChangeFilter, [target.name]: target.value };
    setHandleChangeFilter(payload);
  };

  // atualiza lista de options disponiveis no select e estado global filterByNumericValues
  const addSelectOptions = () => {
    console.log('menu', filterByNumericValues);
    const updateFilterByNumericValues = { ...handleChangeFilter };
    const numericNumbersUpdated = [...filterByNumericValues, updateFilterByNumericValues];
    setfilterByNumericValues(numericNumbersUpdated);
    const arrayColumn = [...optionColumn];
    const positionColumn = optionColumn.indexOf(handleChangeFilter.column);
    arrayColumn.splice(positionColumn, 1);
    const payload = { ...handleChangeFilter, column: arrayColumn[0] };
    setOptionColumn(arrayColumn);
    setHandleChangeFilter(payload);
  };

  // função handleClick que aplica a lógica de filtros e gera um novo array modificado para ser renderizado na table
  const filterHandleClick = (event) => {
    event.preventDefault();
    addSelectOptions();
  };

  const removeAllFilters = (event) => {
    event.preventDefault();
    const options = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    const filter = { column: 'population', comparison: 'maior que', value: 0 };
    setfilterByNumericValues([]);
    setOptionColumn(options);
    setHandleChangeFilter(filter);
  };

  const removeFilter = (event) => {
    event.preventDefault();
    const options = [...optionColumn];
    const numbericNumberUpdate = [...filterByNumericValues];
    const newArr = numbericNumberUpdate
      .filter((item) => item.column !== event.target.name);
    setfilterByNumericValues(newArr);
    options.push(event.target.name);
    const payload = { ...handleChangeFilter, column: event.target.name };
    setOptionColumn(options);
    setHandleChangeFilter(payload);
  };

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <form>
        <label htmlFor="search">
          Buscar:
          {' '}
          <input
            name="search"
            type="text"
            data-testid="name-filter"
            onChange={ (event) => setFilter({ name: event.target.value }) }
          />
        </label>
        <label htmlFor="columFilter">
          <select
            name="column"
            id="colum"
            data-testid="column-filter"
            onChange={ handleChangeFilterByNumericValues }
            value={ handleChangeFilter.column }
          >
            {optionColumn.map((
              (option) => (<option key={ option } value={ option }>{option}</option>)))}
          </select>
        </label>

        <label htmlFor="operadorFilter">
          <select
            name="comparison"
            id="operador"
            data-testid="comparison-filter"
            onChange={ handleChangeFilterByNumericValues }
            value={ handleChangeFilter.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="valueFilter">
          <input
            type="text"
            data-testid="value-filter"
            name="value"
            value={ handleChangeFilter.value }
            onChange={ handleChangeFilterByNumericValues }
          />
        </label>

        <button
          name="buttonFilter"
          type="submit"
          data-testid="button-filter"
          onClick={ filterHandleClick }
          disabled={ !handleChangeFilter.column }
        >
          Filtrar
        </button>
        <button
          name="removeFilters"
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filtros
        </button>
      </form>
      <ul>
        {filterByNumericValues.map((item) => (
          <li key={ item.column } data-testid="filter">
            <button
              type="button"
              onClick={ removeFilter }
              name={ item.column }
            >
              {`${item.column} ${item.comparison}: ${item.value}`}
            </button>
          </li>
        ))}
      </ul>
      <Sort />
    </>
  );
}

export default Menu;
