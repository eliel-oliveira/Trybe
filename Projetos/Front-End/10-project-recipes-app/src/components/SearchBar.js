import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import {
  foodsFilterIngredients,
  foodsFilterNome,
  foodsFilterFirstLetter,
  drinkFilterIngredients,
  drinkFilterNome,
  drinkFilterFirstLetter,
} from '../services/themealdb';

function SearchBar() {
  const { setapiFoods, setapiDrinks, apiFoods, apiDrinks } = useContext(GlobalContext);
  const [filter, setFilter] = useState(
    {
      SearchInput: '',
      radios: '',
    },
  );

  const handleInput = ({ target }) => {
    setFilter((oldState) => ({ ...oldState,
      [target.name]: target.value,
    }));
  };

  const foodFunction = async () => {
    const { radios, SearchInput } = filter;
    let apiResponse = [];
    if (radios === 'firstLetter' && (SearchInput.length > 1 || !SearchInput.trim())) {
      return global.alert('Your search must have only 1 (one) character');
    }
    switch (radios) {
    case 'ingredientes':
      apiResponse = await foodsFilterIngredients(SearchInput);
      if (apiResponse) { setapiFoods(apiResponse); } else { setapiFoods(apiFoods); }
      break;
    case 'name':
      apiResponse = await foodsFilterNome(SearchInput);
      if (apiResponse) { setapiFoods(apiResponse); } else { setapiFoods(apiFoods); }
      break;
    case 'firstLetter':
      apiResponse = await foodsFilterFirstLetter(SearchInput);
      if (apiResponse) { setapiFoods(apiResponse); } else { setapiFoods(apiFoods); }
      break;
    default:
      return global
        .alert('Your search must choose a filter (ingredients, name or first letter)');
    }
  };

  const drinkFunction = async () => {
    const { radios, SearchInput } = filter;
    let apiResponse = [];
    if (radios === 'firstLetter' && (SearchInput.length > 1 || !SearchInput.trim())) {
      return global.alert('Your search must have only 1 (one) character');
    }
    switch (radios) {
    case 'ingredientes':
      apiResponse = await drinkFilterIngredients(SearchInput);
      if (apiResponse) { setapiDrinks(apiResponse); } else { setapiDrinks(apiDrinks); }
      break;
    case 'name':
      apiResponse = await drinkFilterNome(SearchInput);
      if (apiResponse) { setapiDrinks(apiResponse); } else { setapiDrinks(apiDrinks); }
      break;
    case 'firstLetter':
      apiResponse = await drinkFilterFirstLetter(SearchInput);
      if (apiResponse) { setapiDrinks(apiResponse); } else { setapiDrinks(apiDrinks); }
      break;
    default:
      return global
        .alert('Your search must choose a filter (ingredients, name or first letter)');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (document.location.pathname === '/foods') {
      return foodFunction();
    }
    return drinkFunction();
  };

  useEffect(() => {
    const meals = apiFoods;
    const drinks = apiDrinks;
    if (meals?.length === 1) {
      document.location.pathname = `/foods/${meals[0].idMeal}`;
    }
    if (drinks?.length === 1) {
      document.location.pathname = `/drinks/${drinks[0].idDrink}`;
    }
  }, [apiFoods, apiDrinks]);

  const { SearchInput } = filter;
  return (
    <form>
      <input
        name="SearchInput"
        type="text"
        placeholder="Search Recipe"
        data-testid="search-input"
        value={ SearchInput }
        onChange={ handleInput }
      />
      <label htmlFor="Ingredientes">
        Ingredientes
        <input
          id="Ingredientes"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radios"
          value="ingredientes"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="radio"
          data-testid="name-search-radio"
          name="radios"
          value="name"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input
          id="firstLetter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="radios"
          value="firstLetter"
          onChange={ handleInput }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSubmit }
      >
        Pesquisar
      </button>
    </form>
  );
}

export default SearchBar;
