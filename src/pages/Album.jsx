import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: [],
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { match } = this.props;
    const musics = await getMusics(match.params.id);
    this.setState({
      album: musics.slice(1),
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
  };

  render() {
    const { album, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="album-name">{ collectionName }</p>
        <p data-testid="artist-name">{ artistName }</p>
        {album.map((music) => <MusicCard key={ music.trackId } music={ music } />)}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
