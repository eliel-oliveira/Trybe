import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <header>
        <div data-testid="email-field">{user}</div>
        <div data-testid="header-currency-field">BRL</div>
        <div data-testid="total-field">
          {
            expenses.reduce((acc, cur) => {
              const { currency } = cur;
              const { exchangeRates } = cur;
              const currencyActual = Number(exchangeRates[currency].ask);
              const sum = currencyActual * cur.value;
              acc += sum;
              return Math.round(acc * 100) / 100;
            }, 0).toFixed(2)
          }

        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
