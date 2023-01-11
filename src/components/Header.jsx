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
        <Link to="/search">
          Procurar
        </Link>
        <Link to="/album/:id">
          Album
          <br />
        </Link>
        <Link to="/favorites">
          Favoritos
          <br />
        </Link>
        <Link to="/profile">
          Perfil
          <br />
        </Link>
        <Link to="/profile/edit">
          Editar perfil
          <br />
        </Link>
        <span />
      </header>
    );
  }
}
