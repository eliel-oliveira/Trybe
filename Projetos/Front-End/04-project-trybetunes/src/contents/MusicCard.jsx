import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  favoriteChange = async (event) => {
    const { loading, trackId, trackName, previewUrl } = this.props;
    loading(true);
    if (event.target.checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
    loading(false);
  }

  render() {
    const { trackName, previewUrl, trackId, checkFavorite } = this.props;
    return (

      <form>
        <label htmlFor="trackname">
          {trackName}
        </label>
        <audio
          data-testid="audio-component"
          src={ `${previewUrl}` }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <span id="fav">
            Favorita
            <input
              name="fav"
              type="checkbox"
              id={ trackId }
              onChange={ this.favoriteChange }
              checked={ checkFavorite }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </span>
        </label>
      </form>

    );
  }
}
MusicCard.propTypes = {
  checkFavorite: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  loading: PropTypes.func.isRequired,
};
export default MusicCard;
