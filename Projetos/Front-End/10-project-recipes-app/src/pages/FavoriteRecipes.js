import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';
import CardFavorite from '../components/CardFavorite';

const getFavoritesFromLocalStorage = () => {
  const favs = localStorage.getItem('favoriteRecipes');
  if (!favs) return false;
  return JSON.parse(favs);
};

const initialFavs = getFavoritesFromLocalStorage();

function FavoriteRecipes() {
  const [currentFavs, setCurrentFavs] = useState(initialFavs);
  const [favsUpdated, setFavsUpdated] = useState(false);

  const handleFavBtn = ({ target }) => {
    const id = target.dataset.details;
    const favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavs = favs.filter((el) => Number(el.id) !== Number(id));
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setFavsUpdated((prev) => !prev);
  };

  const handleFilterBtn = (type = false) => {
    if (!type) {
      return setCurrentFavs(getFavoritesFromLocalStorage());
    }
    const favs = getFavoritesFromLocalStorage();
    const filteredFavs = favs.filter((el) => el.type === type);
    if (filteredFavs.length > 0) return setCurrentFavs(filteredFavs);
    setCurrentFavs(false);
  };

  const { setheaderTitle } = useContext(GlobalContext);
  useEffect(() => {
    setheaderTitle({ title: 'Favorite Recipes', search: false });
  }, [setheaderTitle]);

  useEffect(() => {
    setCurrentFavs(getFavoritesFromLocalStorage());
  }, [favsUpdated]);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterBtn() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFilterBtn('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterBtn('drink') }
      >
        Drink
      </button>
      { currentFavs
      && <CardFavorite props={ currentFavs } handleFavBtn={ handleFavBtn } />}
    </>
  );
}

export default FavoriteRecipes;

/*
[{
    id: id-da-receita,
    type: food-ou-drink,
    nationality: nacionalidade-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}]
*/
