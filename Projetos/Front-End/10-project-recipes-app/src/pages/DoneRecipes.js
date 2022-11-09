import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  const getFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const { setheaderTitle } = useContext(GlobalContext);
  const [currentDones, setcurrentDones] = useState(getFromLocalStorage);

  useEffect(() => {
    setheaderTitle({ title: 'Done Recipes', search: false });
  }, [setheaderTitle]);

  const handleFilterBtn = (type = false) => {
    if (!type) {
      return setcurrentDones(getFromLocalStorage);
    }
    const filteredDones = getFromLocalStorage.filter((el) => el.type === type);
    if (filteredDones.length > 0) return setcurrentDones(filteredDones);
    setcurrentDones(false);
  };

  return (
    <>
      <Header />
      <section>
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
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterBtn('drink') }
        >
          Drinks
        </button>
      </section>
      { currentDones && currentDones.map((recipe, index) => (
        <CardDoneRecipes
          key={ index }
          type={ recipe.type }
          nacionalidade={ recipe.nationality }
          imagem={ recipe.image }
          name={ recipe.name }
          index={ index }
          tag={ recipe.tags }
          category={ recipe.category }
          alcoholic={ recipe.alcoholicOrNot }
          feitoEm={ recipe.doneDate }
          id={ recipe.id }
        />
      ))}
    </>
  );
}

export default DoneRecipes;
