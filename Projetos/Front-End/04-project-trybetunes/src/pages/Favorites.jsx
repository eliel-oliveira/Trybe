import React from 'react';
import Header from '../contents/Header';
import Loading from '../contents/Loading';
import MusicCard from '../contents/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((song) => this.setState({
      favoriteSongs: song,
      loading: false,
    }));
    this.updateFavoriteSongs();
  }

  load = async (isLoading) => {
    this.setState({
      loading: isLoading,
    }, this.updateFavoriteSongs);
  };

  updateFavoriteSongs = async () => {
    const localSorageList = await getFavoriteSongs();
    this.setState({
      favoriteSongs: localSorageList,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h2>
            Musicas Favoritas:
          </h2>
          {loading ? <Loading />
            : (
              <div>
                {favoriteSongs.map((music) => (<MusicCard
                  loading={ this.load }
                  key={ music.trackId }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  favoriteSongs={ favoriteSongs }
                  checkFavorite={ favoriteSongs
                    .some((song) => song.trackId === music.trackId) }
                />))}
              </div>) }
        </div>
      </div>
    );
  }
}

export default Favorites;
