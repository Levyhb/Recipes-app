import { DRINK_DETAIL } from '../actions';

const INITIAL_STATE = {
  drinks: [],
  drinkDetail: null,
};

function drinks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINK_DETAIL:
    return {
      ...state,
      drinkDetail: action.payload.drinks[0],
    };
  default:
    return state;
  }
}

export default drinks;
