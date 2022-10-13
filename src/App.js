import React from 'react';
import './App.css';
import lottie from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import 'react-tippy/dist/tippy.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipeDetails';
import Drinks from './pages/Drinks';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinksDetails from './pages/DrinksDetails';
import 'animate.css';

defineLordIconElement(lottie.loadAnimation);

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ RecipesDetails } />
        <Route exact path="/drinks/:id" component={ DrinksDetails } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
