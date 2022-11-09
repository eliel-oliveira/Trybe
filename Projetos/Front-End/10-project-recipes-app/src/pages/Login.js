import React, { useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

function Login(props) {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const SIX = 6;
    if (password.length > SIX && isEmail(email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleInput = ({ target }) => {
    if (target.type === 'email') {
      setEmail(target.value);
    }
    if (target.type === 'password') {
      setPassword(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { history } = props;
    const userObj = { email };
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <form className="login">
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleInput }
        />

      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          minLength="6"
          data-testid="password-input"
          value={ password }
          onChange={ handleInput }
        />
      </label>
      <button
        type="submit"
        disabled={ disabled }
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
      >
        Login

      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
