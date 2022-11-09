import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import DetailsCard from '../components/DetailsCard';
import RecomendationCard from '../components/RecomendationCard';
import { objectFilter } from '../helperFuncions';
import shareIcon from '../images/shareIcon.svg';
import favIconWhite from '../images/whiteHeartIcon.svg';
import favIconBlack from '../images/blackHeartIcon.svg';

const START_RECIPE = 'Start Recipe';

const checkIfRecipeIsFav = (setFavoriteFunc, id) => {
  const oldFavs = localStorage.getItem('favoriteRecipes');
  if (!oldFavs) {
    setFavoriteFunc(false);
    return false;
  }
  const match = JSON.parse(oldFavs).find((el) => Number(el.id) === Number(id));
  if (match) {
    setFavoriteFunc(true);
    return true;
  }
  setFavoriteFunc(false);
  return false;
};

const toogleStartButn = (id) => {
  if (!localStorage.getItem('doneRecipes')) return true;
  const done = localStorage.getItem('doneRecipes');
  const match = JSON.parse(done)?.find((el) => Number(el.id) === Number(id));
  // if (match) return 'hidden';
  // return '';
  return !match;
};

const renderBtnText = (id) => {
  if (!localStorage.getItem('inProgressRecipes')) return START_RECIPE;
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const idsObj = { ...inProgress?.cocktails, ...inProgress?.meals };
  // if (!idsObj) return START_RECIPE;
  const match = objectFilter(idsObj, (key) => Number(key) === Number(id));
  if (Object.entries(match).length > 0) return 'Continue Recipe';
  return START_RECIPE;
};

function RecipeDetails(props) {
  const { match: { params: { id } }, history } = props;
  const { pathname } = history.location; //   /foods/2344323 ['/', 'foods']
  // \b significa "word boundary": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet#:~:text=Matches%20a%20word,Character%20Classes.
  const route = pathname.split(/\b/, 2).at(1);
  const url = `https://www.the${
    route === 'foods' ? 'meal' : 'cocktail'
  }db.com/api/json/v1/1/lookup.php?i=${id}`;

  const [recipe, setRecipe] = useState('');
  const [favorite, setFavorite] = useState(false);

  // Chamada da API realizada na montagem deste componente:
  // TODO: Ajustar este fetch depois da atualizalação dos requisitos anteriores
  useEffect(() => {
    // Para carregar os detalhes da receita:
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data[`${route === 'foods' ? 'meals' : 'drinks'}`].at(0));
      })
      .catch((err) => console.error(`SOMETHING WENT WRONG 💣💣💣: ${err}`));
  }, [url, route, id]);

  const handleFavBtn = () => {
    const isFavorite = checkIfRecipeIsFav(setFavorite, id);
    if (isFavorite) {
      const favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavs = favs.filter((el) => el.id !== id);
      localStorage.setItem('favoriteRecipes', newFavs);
      return setFavorite(false);
    }

    const MINUS_ONE = -1;
    const { strArea, strCategory, strMeal,
      strDrink, strMealThumb, strDrinkThumb, strAlcoholic } = recipe;
    const data = [{
      id,
      type: route.slice(route.at(MINUS_ONE), route.length - 1),
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    }];
    const oldFavs = localStorage.getItem('favoriteRecipes');
    if (!oldFavs) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(data));
      return setFavorite(true);
    }
    const yetAnotherFavs = [...JSON.parse(oldFavs), ...data];
    localStorage.setItem('favoriteRecipes', JSON.stringify(yetAnotherFavs));
    setFavorite(true);
  };

  useEffect(() => {
    checkIfRecipeIsFav(setFavorite, id);
  }, [recipe, id]);

  const handleShareBtn = () => {
    const ONE_HALF_SEC = 1500;
    clipboardCopy(document.URL);
    document.querySelector('.link-copied').classList.toggle('hidden');
    setTimeout(() => {
      document.querySelector('.link-copied').classList.toggle('hidden');
    }, ONE_HALF_SEC);
  };

  return (
    <>
      <DetailsCard { ...recipe } />
      <p className="hidden link-copied">Link copied!</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavBtn }
        src={ favorite ? favIconBlack : favIconWhite } // Por causa do CYPRESS!!
      >
        <img src={ favorite ? favIconBlack : favIconWhite } alt="fav icon" />
      </button>
      <RecomendationCard />
      <Link to={ `/${route}/${id}/in-progress` }>
        { toogleStartButn(id)
        && (
          <button
            type="button"
            className={ `${toogleStartButn(id)} btn btn--start` }
            data-testid="start-recipe-btn"
          >
            { renderBtnText(id) }
          </button>)}
      </Link>
    </>

  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeDetails;
