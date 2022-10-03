import { FOODS_RECIPES,
  CHECKED_STATES,
  CREATE_CHECKED_STATES,
  SAVE_RECIPE_PROGRESS } from '../actions';

const INITIAL_STATE = {
  conditionalRecipes: true,
  recipesInProgress: { drinks: {}, meals: {} },
};

function conditionalRecipe(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOODS_RECIPES:
    return { ...state, conditionalRecipes: action.payload };
  case CREATE_CHECKED_STATES:
    return {
      ...state,
      checkedStates: action.payload,
    };
  case CHECKED_STATES:
    return {
      ...state,
      checkedStates: { ...state.checkedStates, ...action.payload },
    };
  case SAVE_RECIPE_PROGRESS:
    return {
      ...state,
      recipesInProgress: action.payload,
    };
  default:
    return state;
  }
}

export default conditionalRecipe;
