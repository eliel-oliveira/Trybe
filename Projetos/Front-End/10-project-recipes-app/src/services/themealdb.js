const nullAlertMsg = 'Sorry, we haven\'t found any recipes for these filters.';

export const foods = async (endpoint) => {
  const url = `https://www.themealdb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

export const drinks = async (endpoint) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks;
};

export const foodsFilterIngredients = async (ingrediente) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(nullAlertMsg);
    return data.meals;
  }
  return data.meals;
};

export const foodsFilterNome = async (nome) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(nullAlertMsg);
    return data.meals;
  }
  return data.meals;
};

export const foodsFilterFirstLetter = async (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(nullAlertMsg);
    return data.meals;
  }
  return data.meals;
};

export const drinkFilterIngredients = async (ingrediente) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.drinks === null) {
    global.alert(nullAlertMsg);
    return data.drinks;
  }
  return data.drinks;
};

export const drinkFilterNome = async (nome) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.drinks === null) {
    global.alert(nullAlertMsg);
    return data.drinks;
  }
  return data.drinks;
};

export const drinkFilterFirstLetter = async (firstLetter) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.drinks === null) {
    global.alert(nullAlertMsg);
    return data.drinks;
  }
  return data.drinks;
};

export const recipes = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (url.includes('meal')) {
    return data.meals;
  }
  return data.drinks;
};
