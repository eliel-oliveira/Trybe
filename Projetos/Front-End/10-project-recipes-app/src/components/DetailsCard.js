import React from 'react';
import PropTypes from 'prop-types';
import { objectFilter } from '../helperFuncions';

function DetailsCard(props) {
  if (!props) return null;
  const recipe = { ...props };
  const { strDrinkThumb, strMealThumb, strCategory, strAlcoholic,
    strDrink, strMeal, strInstructions, strYoutube } = recipe;

  const ingredients = objectFilter(recipe,
    (key, value) => key.includes('strIngredient') && value);

  const measures = objectFilter(props,
    (key, value) => key.includes('strMeasure') && value);

  const ingredientsMarkup = (ingredientsObj, measuresObj) => {
    const ingKeys = Object.keys(ingredientsObj);
    const measuresValues = Object.values(measuresObj);
    const markup = ingKeys.map((key, index) => (
      <li
        key={ key }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${ingredientsObj[key]} ${measuresValues[index] || ''}`}

      </li>
    ));
    return markup;
  };

  const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;
    const videoId = videoUrl.split('=').at(1);
    return (
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube-nocookie.com/embed/${videoId}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <article>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb || strMealThumb }
        alt={ `${strCategory} ${strDrink}` }
      />
      <h2 data-testid="recipe-title">{strDrink || strMeal}</h2>
      <h3 data-testid="recipe-category">{strAlcoholic || strCategory}</h3>
      <ul>
        { ingredientsMarkup(ingredients, measures) }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <div>
        { renderVideo(strYoutube) }
      </div>
    </article>
  );
}

DetailsCard.propTypes = {
  strDrinkThumb: PropTypes.string,
  strCategory: PropTypes.string,
  strDrink: PropTypes.string,
}.isRequired;

export default DetailsCard;
