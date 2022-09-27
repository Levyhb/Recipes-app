import { FOODS_RECIPES } from '../actions';

const INITIAL_STATE = {
  conditionalRecipes: true,
};

function conditionalRecipe(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOODS_RECIPES:
    return { ...state, conditionalRecipes: action.payload };
  default:
    return state;
  }
}

export default conditionalRecipe;
