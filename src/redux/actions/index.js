
export const MEAL_DETAIL = 'MEAL_DETAIL';
export const DRINK_DETAIL = 'DRINK_DETAIL';

export const getMealDetail = (payload) => ({ type: MEAL_DETAIL, payload });
export const getDrinkDetail = (payload) => ({ type: DRINK_DETAIL, payload });

export const FOODS_RECIPES = 'FOODS_RECIPES';

const foodsRecipes = (payload) => ({
  type: FOODS_RECIPES,
  payload,
});

export default foodsRecipes;

