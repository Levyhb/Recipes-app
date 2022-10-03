export const MEAL_DETAIL = 'MEAL_DETAIL';
export const DRINK_DETAIL = 'DRINK_DETAIL';
export const FOODS_RECIPES = 'FOODS_RECIPES';
export const CHECKED_STATES = 'CHECKED_STATES';
export const CREATE_CHECKED_STATES = 'CREATE_CHECKED_STATES';
export const SAVE_RECIPE_PROGRESS = 'SAVE_RECIPE_PROGRESS';

export const getMealDetail = (payload) => ({ type: MEAL_DETAIL, payload });
export const getDrinkDetail = (payload) => ({ type: DRINK_DETAIL, payload });
export const foodsRecipes = (payload) => ({
  type: FOODS_RECIPES,
  payload,
});
export const createCheckedStates = (payload) => ({ type: CREATE_CHECKED_STATES,
  payload });
export const updateCheckedStates = (payload) => ({ type: CHECKED_STATES, payload });
export const saveRecipeProgress = (payload) => ({ type: SAVE_RECIPE_PROGRESS, payload });
