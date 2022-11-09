import React from 'react';
import { shape } from 'prop-types';
import Header from '../contents/Header';
import musicsAPI from '../services/musicsAPI';
import CardMusic from '../contents/CardMusic';
import MusicCard from '../contents/MusicCard';
import Loading from '../contents/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicsArray: [{
        artistName: 'ArtistName',
        artworkUrl100: 'image',
        collectionId: 1,
        collectionName: 'AlbumName',
        trackCount: 0 }],
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.albumAddMusic();
    this.updateFavoriteSongs();
  }

  albumAddMusic = async () => {
    const { match } = this.props;
    const musicID = match.params.id;
    const response = await musicsAPI(musicID);
    this.setState({ musicsArray: response });
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
    const { musicsArray, loading, favoriteSongs } = this.state;
    return (
      <div>
        <Header />
        {loading
          ? <Loading />
          : (
            <div data-testid="page-album">
              <div className="albumPage">
                <CardMusic { ...musicsArray[0] } />
                <div>
                  {musicsArray.slice(1).map((music) => (music.trackName && <MusicCard
                    loading={ this.load }
                    key={ music.trackId }
                    trackId={ music.trackId }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    favoriteSongs={ favoriteSongs }
                    checkFavorite={ favoriteSongs
                      .some((song) => song.trackId === music.trackId) }
                  />))}
                </div>
              </div>
            </div>)}
      </div>
    );
  }
}
Album.propTypes = {
  match: shape({}).isRequired,
};
export default Album;
