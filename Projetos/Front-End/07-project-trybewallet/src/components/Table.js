import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeActionThunk, editItemThunk } from '../redux/actions';

class Table extends Component {
  removeHandleClick = (event) => {
    const { removeItem, stateProps } = this.props;
    const payload = {
      id: event.target.name,
      stateProps,
    };
    removeItem(payload);
  }

  editHandleClick = (event) => {
    const { editItem, buttonEdit, stateProps } = this.props;
    const id = event.target.name;
    const { active } = buttonEdit;
    const payload = {
      id, buttonEdit: active, stateProps,
    };
    editItem(payload);
  }

  render() {
    const { stateProps } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {stateProps.map((item) => (
            <tr key={ item.id }>
              {/* description */}
              <td>{item.description}</td>
              {/* tag */}
              <td>{item.tag}</td>
              {/* metodo de pagamento */}
              <td>{item.method}</td>
              {/* valor */}
              <td>{(Number(item.value)).toFixed(2)}</td>
              {/* tipo da moeda */}
              <td>{item.currency}</td>
              {/* cambio utilizado */}
              <td>{(Number(item.exchangeRates[item.currency].ask)).toFixed(2)}</td>
              {/* valor convetido */}
              <td>{(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}</td>
              {/* moeda de conversão */}
              <td>{item.exchangeRates[item.currency].name}</td>
              {/* botao deletar */}
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ this.editHandleClick }
                  name={ item.id }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ this.removeHandleClick }
                  name={ item.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  stateProps: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  stateProps: state.wallet.expenses,
  buttonEdit: state.wallet.buttonEdit,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (payload) => dispatch(removeActionThunk(payload)),
  editItem: (payload) => dispatch(editItemThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
