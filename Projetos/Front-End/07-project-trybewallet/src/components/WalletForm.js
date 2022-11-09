import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiThunk,
  expensesActionThunk,
  editExpenseActionThunk } from '../redux/actions';
import Table from './Table';

const food = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    };
  }

  componentDidMount() {
    const { currencyAPI } = this.props;
    currencyAPI();
  }

  handleState = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
    );
  }

  clearInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
  }

  handleSubmit = () => {
    const { expensies } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates } = this.state;
    this.setState({
      id: id + 1,
    });
    const payload = {
      id, value, description, currency, method, tag, exchangeRates,
    };
    expensies(payload);
    this.clearInputs();
  }

  editHandleSubmit = () => {
    const { buttonEdit, editExpense, expensesState } = this.props;
    const { active, id } = buttonEdit;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const componentState = {
      value, description, currency, method, tag,
    };
    const payload = {
      componentState, active, id, expensesState,
    };
    editExpense(payload);
  }

  render() {
    const { currencyProps, buttonEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              className="value"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleState }
            />
          </label>
          <label htmlFor="description">
            Despesas
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleState }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleState }
            >
              {currencyProps.map((moeda) => <option key={ moeda }>{moeda}</option>)}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            <select
              data-testid="method-input"
              onChange={ this.handleState }
              name="method"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              onChange={ this.handleState }
              name="tag"
              value={ tag }
            >
              <option>{food}</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        {/* este buttom precisa alterar no modo editar e submit */}
        { buttonEdit.active
          ? (
            <button
              type="button"
              onClick={ this.editHandleSubmit }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ this.handleSubmit }
            >
              Adicionar despesa
            </button>
          )}

        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyAPI: () => dispatch(getApiThunk()),
  expensies: (payload) => dispatch(expensesActionThunk(payload)),
  editExpense: (payload) => dispatch(editExpenseActionThunk(payload)),
});

const mapStateToProps = (state) => ({
  currencyProps: state.wallet.currencies,
  buttonEdit: state.wallet.buttonEdit,
  expensesState: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencyProps: PropTypes.arrayOf(PropTypes.string),
  currencyAPI: PropTypes.func,
  expensies: PropTypes.func,
  buttonEdit: PropTypes.obj,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
