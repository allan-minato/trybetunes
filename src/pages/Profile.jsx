import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h2>página de Profile</h2>
        <Header />
      </div>
    );
  }
}

export default Profile;
