import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      submitValue: '',
      loading: false,
      redirect: false,
    };
  }

  async handleSubmit({ target }) {
    const { value } = target;
    console.log(target);
    await this.setState({
      submitValue: value,
      loading: false,
    });
  }

  handleClick = async () => {
    const { submitValue } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: submitValue });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { submitValue, loading, redirect } = this.state;
    const validationNumber = 3;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <h2>página de login</h2>
        <input
          data-testid="login-name-input"
          type="text"
          name="submitValue"
          value={ submitValue }
          onChange={ this.handleSubmit }
          id=""
        />
        {loading && <Loading />}
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ submitValue.length < validationNumber }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
