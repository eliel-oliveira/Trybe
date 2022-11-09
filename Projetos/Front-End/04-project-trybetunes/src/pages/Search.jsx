import React from 'react';
import Header from '../contents/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardMusic from '../contents/CardMusic';
import Loading from '../contents/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      buttonDisable: true,
      loading: false,
      search: [],
      nameSearch: '',
      albumNotFound: false,
    };
  }

  changeInputState = (event) => {
    const minCaractersSearch = 2;
    if (event.target.value.length < minCaractersSearch) {
      this.setState({
        buttonDisable: true,
        inputSearch: event.target.value,
      });
    } else {
      this.setState({
        buttonDisable: false,
        inputSearch: event.target.value,
      });
    }
  }

  submitButton = (event) => {
    event.preventDefault();
    const { inputSearch } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(inputSearch)
      .then((resultSearch) => {
        if (resultSearch.length) {
          this.setState({
            search: resultSearch,
            inputSearch: '',
            loading: false,
            resultSearch: true,
            nameSearch: inputSearch,
            albumNotFound: false });
        } else {
          this.setState({
            search: resultSearch,
            loading: false,
            albumNotFound: true,
          });
        }
      });
  }

  render() {
    const {
      buttonDisable,
      inputSearch,
      loading,
      nameSearch,
      resultSearch,
      search,
      albumNotFound } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading />
          : (
            <div data-testid="page-search" className="searchPage">
              <form action="" className="sectionSearchInput">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.changeInputState }
                  value={ inputSearch }
                />
              </form>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisable }
                onClick={ this.submitButton }
              >
                Pesquisar
              </button>
            </div>)}
        {resultSearch
        && (
          <section className="listResults">
            <div className="searchTitle">
              {`Resultado de álbuns de: ${nameSearch}`}
            </div>
            <div className="reultsSearch">
              {search.map((album, index) => (
                <CardMusic
                  key={ index }
                  { ...album }
                />))}
            </div>
          </section>)}
        {albumNotFound && <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
