import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class CardMusic extends React.Component {
  render() {
    const {
      collectionId,
      artistName,
      artworkUrl100,
      collectionName,
      trackCount } = this.props;
    return (
      <Link to={ `/album/${collectionId}` }>
        <div className="card" data-testid={ `link-to-album-${collectionId}` }>
          <img
            src={ artworkUrl100 }
            alt={ ` capa do album ${collectionName} de ${artistName}` }
          />
          <div className="description">
            <p data-testid="album-name">
              {`Album: ${collectionName}`}
            </p>
            <p data-testid="artist-name">
              {`Artista: ${artistName}`}
            </p>
            <p>
              {`Quantidade de musicas: ${trackCount}`}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

CardMusic.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default CardMusic;
