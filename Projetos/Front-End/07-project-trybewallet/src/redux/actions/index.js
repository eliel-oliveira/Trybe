import getCurrencyValue from '../../services/currencyAPI';

export const EMAIL_VALUE = 'EMAIL_VALUE';
export const emailAction = (email) => ({
  type: EMAIL_VALUE,
  payload: email,
});

export const CURRENCY_VALUE = 'CURRENCY_VALUE';
export const getCurrencyApi = (currency) => ({
  type: CURRENCY_VALUE,
  payload: currency,
});

export const EXPENSES = 'EXPENSES';
export const expensesAction = (expenses) => (
  {
    type: EXPENSES,
    payload: { ...expenses },
  });

export const expensesActionThunk = (payload) => async (dispatch) => {
  const expenses = payload;
  const response = await getCurrencyValue();
  delete response.USDT;
  const newPayload = {
    ...expenses, exchangeRates: { ...response },
  };
  dispatch(expensesAction(newPayload));
};

export const getApiThunk = () => async (dispatch) => {
  const response = await getCurrencyValue();
  delete response.USDT;
  const payload = response;
  const currenciesArray = Object.keys(payload);
  dispatch(getCurrencyApi(currenciesArray));
};

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeAction = (payload) => ({
  type: REMOVE_ITEM,
  payload,
});

export const removeActionThunk = (payload) => (dispatch) => {
  const { id, stateProps } = payload;
  const newState = stateProps.filter((item) => Number(id) !== Number(item.id));
  dispatch(removeAction(newState));
};

export const EDIT_ITEM = 'EDIT_ITEM';
export const editItem = (payload) => ({
  type: EDIT_ITEM,
  payload,
});

export const editItemThunk = (payload) => (dispatch) => {
  const { id, buttonEdit } = payload;
  const newPayload = { active: !buttonEdit, id };
  dispatch(editItem(newPayload));
};

export const EDIT_ITEM_PAYLOAD = 'EDIT_ITEM_PAYLOAD';
export const editExpenseAction = (payload) => ({
  type: EDIT_ITEM_PAYLOAD,
  payload,
});

export const editExpenseActionThunk = (payload) => (dispatch) => {
  const { active, componentState, id, expensesState } = payload;
  const newExpensesState = expensesState.reduce((acc, cur) => {
    if (cur.id === Number(id)) {
      const itemEdited = { ...cur, ...componentState };
      acc.push(itemEdited);
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
  const newPayload = {
    active: !active, newExpensesState,
  };
  dispatch(editExpenseAction(newPayload));
};
