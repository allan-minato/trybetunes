import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <h2>página de Album</h2>
        <Header />
      </div>
    );
  }
}

export default Album;
