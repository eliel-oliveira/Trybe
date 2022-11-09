import {
  CURRENCY_VALUE,
  EXPENSES,
  REMOVE_ITEM,
  EDIT_ITEM,
  EDIT_ITEM_PAYLOAD } from '../actions';

const INITIAL_STATE = {
  currencies: ['USD'],
  expenses: [],
  buttonEdit: {
    active: false,
    id: '',
  },
  error: null,
};

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_VALUE:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case EDIT_ITEM:
    return {
      ...state,
      buttonEdit: action.payload,
    };
  case EDIT_ITEM_PAYLOAD:
    return {
      ...state,
      buttonEdit: action.payload.active,
      expenses: action.payload.newExpensesState,
    };
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: action.payload,
    };
  default: return state;
  }
};

export default currency;
