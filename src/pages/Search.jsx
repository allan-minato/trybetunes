import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artistName: '',
    isLoading: false,
    albuns: [],
    apiReturn: true,
  };

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
    });
    const searchReturn = await searchAlbumsAPI(artistName);
    if (searchReturn.length === 0) {
      this.setState({
        apiReturn: false,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
        albuns: searchReturn,
        apiReturn: true,
      });
    }
  };

  render() {
    const { artistName, isLoading, albuns, apiReturn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              name=""
              id=""
              onChange={ ({ target: { value } }) => this.setState({
                artistName: value,
              }) }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ artistName.length < 2 }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            {apiReturn === false && <span>Nenhum álbum foi encontrado</span>}
            <span>
              {`Resultado de álbuns de: ${artistName}`}
            </span>
            { albuns.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <span>{album.collectionName}</span>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              </Link>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Search;
