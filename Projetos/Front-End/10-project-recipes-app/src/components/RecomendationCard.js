import React, { useEffect, useState } from 'react';

function RecomendationCard() {
  const { pathname } = document.location;
  const route = pathname.split(/\b/, 2).at(1);
  const url = `https://www.the${
    route === 'foods' ? 'cocktail' : 'meal'
  }db.com/api/json/v1/1/search.php?s=`;

  const [recipes, setRecipes] = useState('');

  // Esta requisição a API visa pegar todos as comidas ou bebidas.
  // TODO: Deve ser refatorado após o merge com os requisitos anteriores
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRecipes(
        data[`${route === 'foods' ? 'drinks' : 'meals'}`],
      ))
      .catch((err) => console.error(`SOMETHING WENT WRONG 🤯🤯🤯: ${err}`));
  }, [url, route]);

  const renderCards = (recipesObj) => {
    const SIX = 6;
    const recommends = [];
    recipesObj.forEach((rec, i) => { if (i < SIX) recommends.push(rec); });
    const markup = (array) => array.map((el, i) => (
      <figure
        data-testid={ `${i}-recomendation-card` }
        key={ `${el.idMeal}${i}` || `${el.idDrinks}${i}` }
        className={ i > 1 ? 'hidden' : '' }
      >
        <img
          src={ el.strMealThumb || el.strDrinkThumb }
          alt={ el.strMeal || el.strDrink }
        />
        <h4 data-testid={ `${i}-recomendation-title` }>{el.strMeal || el.strDrink }</h4>
        <p>{el.strCategory || el.strAlcoholic }</p>
      </figure>
    ));
    return markup(recommends);
  };

  return (
    <figure>
      { recipes && renderCards(recipes)}
    </figure>
  );
}

export default RecomendationCard;
