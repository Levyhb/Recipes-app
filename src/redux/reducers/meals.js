import { MEAL_DETAIL } from '../actions';

const INITIAL_STATE = {
  meals: [],
  mealDetail: null,
};

function meals(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEAL_DETAIL:
    return {
      ...state,
      mealDetail: action.payload.meals[0],
    };
  default:
    return state;
  }
}

export default meals;
