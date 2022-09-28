import { combineReducers } from 'redux';
import user from './user';
import meals from './meals';
import drinks from './drinks';
import conditionalRecipe from './conditionalRecipe';

const rootReducer = combineReducers({ user, meals, drinks, conditionalRecipe });
export default rootReducer;
