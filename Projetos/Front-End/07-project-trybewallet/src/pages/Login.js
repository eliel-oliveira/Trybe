import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: 0,
      buttonValidade: true,
    };
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    }, this.validateButton());
  }

  handlePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password: password.length,
    }, () => this.validateButton());
  }

  validateButton = () => {
    const { email, password } = this.state;
    const emailValidade = /\S+@\S+\.\S+/;
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const minCharactersPassword = 6;
    if (emailValidade.test(email) && password >= minCharactersPassword) {
      this.setState({
        buttonValidade: false,
      });
    } else {
      this.setState({
        buttonValidade: true,
      });
    }
  }

  handleButton = (event) => {
    event.preventDefault();
    const { history, userEmail } = this.props;
    const { email } = this.state;
    userEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, buttonValidade } = this.state;
    return (
      <main>
        <form>
          <label htmlFor="email">
            <p>Faça seu login</p>
            <input
              data-testid="email-input"
              type="email"
              placeholder="e-mail"
              onChange={ this.handleEmail }
              value={ email }
            />
            <input
              data-testid="password-input"
              type="password"
              placeholder="senha"
              onChange={ this.handlePassword }
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ buttonValidade }
          onClick={ this.handleButton }
        >
          Entrar

        </button>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
