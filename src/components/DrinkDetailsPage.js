import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/components/DetailsPage.css';
import IngredientsList from './IngredientsList';

function DrinkDetailsPage() {
  const drink = useSelector((state) => state.drinks.drinkDetail);
  const ingredientsKeys = Object.keys(drink).filter((item) => item
    .includes('Ingredient') && drink[item] !== null);
  const ingredientsValues = ingredientsKeys.map((item) => drink[item])
    .filter((item) => item !== '');
  const measuresKeys = Object.keys(drink).filter((item) => item
    .includes('Measure') && drink[item] !== null);
  const measuresValues = measuresKeys.map((item) => drink[item]);
  // refatorar para 1 função

  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setBtnDisabled(doneRecipes
      .every((e) => e.name !== drink.strDrink));
  }, []);

  return (
    <div>
      <img
        src={ `${drink.strDrinkThumb}` }
        alt="drink"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <h2 data-testid="recipe-category">{drink.strAlcoholic}</h2>
      <IngredientsList
        measuresValues={ measuresValues }
        ingredientsValues={ ingredientsValues }
      />
      <p data-testid="instructions">{drink.strInstructions}</p>

      {
        btnDisabled && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
          >
            Start Recipe
          </button>
        )
      }
    </div>
  );
}

export default DrinkDetailsPage;
