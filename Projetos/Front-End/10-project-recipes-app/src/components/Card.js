import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function Card(props) {
  const { headerTitle } = useContext(GlobalContext);
  const { imagem, name, index, testid, id } = props;
  return (
    <Link to={ `${headerTitle.title.toLowerCase()}/${id}` }>
      <div data-testid={ testid }>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <img src={ imagem } alt={ name } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

Card.propTypes = {
  imagem: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.number,
}.isRequired;

export default Card;
