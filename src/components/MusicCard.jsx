import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  getApiSong = async () => {
    const { music } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { music } = this.props;
    const { isLoading } = this.state;
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
