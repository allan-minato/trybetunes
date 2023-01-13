import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  async componentDidMount() {
    this.setState({
      checked: await this.handleFavoritesSongs(),
    });
  }

  handleFavoritesSongs = async () => {
    const { music: { trackId } } = this.props;
    const favSongs = await getFavoriteSongs();
    return favSongs.map((song) => song.trackId).includes(trackId);
  };

  getApiSong = async (event) => {
    const isChecked = event.target.checked;
    const { music } = this.props;
    this.setState({
      isLoading: true,
      checked: isChecked,
    }, async () => {
      if (isChecked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }

      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { music } = this.props;
    const { isLoading, checked } = this.state;
    return (
      <div>
        { isLoading && <Loading /> }
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            checked={ checked }
            onChange={ this.getApiSong }
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
            id="checkbox"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
