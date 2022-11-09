import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../contents/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  onClick =() => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name })
      .then(() => {
        this.setState({
          redirect: true,
        });
      });
  }

  onChangeInput = (event) => {
    const minCaractersInput = 3;
    if (event.target.value.length < minCaractersInput) {
      this.setState({
        buttonDisabled: true,
      });
    } else {
      this.setState({
        buttonDisabled: false,
        name: event.target.value,
      });
    }
  }

  render() {
    const { buttonDisabled, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login" className="page-login">
        {loading ? (<Loading />) : (
          <section className="loginSection">
            <div className="logo" />
            <div className="inputLogin">
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.onChangeInput }
                placeholder="Nome"
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.onClick }
              >
                Entrar
              </button>
            </div>
          </section>)}

      </div>
    );
  }
}

export default Login;
