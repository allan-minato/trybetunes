import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const userName = await getUser();
    const { name } = userName;
    this.setState({
      name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : <p data-testid="header-user-name">{ name }</p> }
        <Link data-testid="link-to-search" to="/search">
          Procurar
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favoritos
          <br />
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Perfil
          <br />
        </Link>
        <span />
      </header>
    );
  }
}
