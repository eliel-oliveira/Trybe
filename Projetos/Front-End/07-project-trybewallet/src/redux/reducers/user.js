// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL_VALUE } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function emailInput(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_VALUE:
    return {
      ...state,
      email: action.payload,
    };
  default: return state;
  }
}

export default emailInput;
