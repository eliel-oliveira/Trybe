import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes(props) {
  const {
    imagem,
    name,
    index,
    tag,
    category,
    nacionalidade,
    alcoholic,
    type,
    feitoEm,
    id,
  } = props;

  const foodToRender = (
    <p
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${nacionalidade} - ${category}` }
    </p>
  );

  const drinkToRender = (
    <p
      data-testid={ `${index}-horizontal-top-text` }
    >
      { alcoholic }
    </p>
  );

  const handleClick = (foodId, tipo) => {
    const url = tipo === 'food' ? `foods/${foodId}` : `drinks/${foodId}`;
    clipboardCopy(`http://localhost:3000/${url}`);

    const ONE_HALF_SEC = 1500;
    document.querySelector('.link-copied')?.classList.toggle('hidden');
    setTimeout(() => {
      document.querySelector('.link-copied')?.classList.toggle('hidden');
    }, ONE_HALF_SEC);
  };

  return (
    <Link to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }>
      <div>
        <img src={ imagem } alt={ name } data-testid={ `${index}-horizontal-image` } />
        { type === 'food' ? foodToRender : drinkToRender }
        <p className="hidden link-copied">Link copied!</p>
        <input
          type="image"
          alt="Share icon"
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => handleClick(id, type) }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        <h4 data-testid={ `${index}-horizontal-done-date` }>
          Done in:
          {`${feitoEm}`}
        </h4>
        { tag !== null && tag.map((eachTag) => (
          <p
            key={ eachTag }
            data-testid={ `${index}-${eachTag}-horizontal-tag` }
          >
            { eachTag }
          </p>
        ))}
      </div>
    </Link>
  );
}

CardDoneRecipes.propTypes = {
  imagem: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.number,
}.isRequired;

export default CardDoneRecipes;
