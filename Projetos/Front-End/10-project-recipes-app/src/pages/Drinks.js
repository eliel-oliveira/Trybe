import React, {
  // useState,
  useContext, useEffect } from 'react';
import Card from '../components/Card';
import Category from '../components/Category';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';
// import CardMain from '../components/CardMain';

const maxItems = 12;
const maxCategorys = 5;

function Drinks() {
  const { apiDrinks,
    apiDrinksCategory,
    filterHandleClick,
    setheaderTitle,
    // recipesAPIReturn,
  } = useContext(GlobalContext);

  // const [recipes, setRecipes] = useState('');

  // const renderCard = (data) => data
  //   .map((response, index) => {
  //     const number = 12;
  //     return index < number && <CardMain
  //       key={ index }
  //       index={ index }
  //       cardInfo={ response }
  //     />;
  //   });

  useEffect(() => {
    setheaderTitle({ title: 'Drinks', search: true });
  }, [setheaderTitle]);

  // useEffect(() => {
  //   if (recipesAPIReturn.drinks) {
  //     setRecipes(renderCard(recipesAPIReturn.drinks));
  //   }
  // }, [recipesAPIReturn]);

  return (
    <>
      <Header />
      <main className="main">
        <div className="category">
          <button
            name="All"
            type="button"
            data-testid="All-category-filter"
            onClick={ filterHandleClick }
          >
            All
          </button>
          {apiDrinksCategory.map((category, index) => (
            index < maxCategorys
          && <Category
            key={ category.strCategory }
            categoryName={ category.strCategory }
          />
          ))}
        </div>
        <div className="products">
          {apiDrinks.map((food, index) => (
            index < maxItems
          && <Card
            key={ food.idDrink }
            id={ food.idDrink }
            testid={ `${index}-recipe-card` }
            imagem={ food.strDrinkThumb }
            name={ food.strDrink }
            index={ index }
          />
          ))}
        </div>
      </main>
      {/* { recipes } */}
    </>
  );
}

export default Drinks;
