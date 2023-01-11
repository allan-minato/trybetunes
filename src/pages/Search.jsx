import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
  };

  render() {
    const { artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
