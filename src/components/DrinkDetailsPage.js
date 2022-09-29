import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/components/DetailsPage.css';
import BtnFavorite from './BtnFavorite';

function DrinkDetailsPage() {
  const drink = useSelector((state) => state.drinks.drinkDetail);
  const ingredientsKeys = Object.keys(drink).filter((item) => item
    .includes('Ingredient') && drink[item] !== null);
  const ingredientsValues = ingredientsKeys.map((item) => drink[item]);
  const measuresKeys = Object.keys(drink).filter((item) => item
    .includes('Measure') && drink[item] !== null);
  const measuresValues = measuresKeys.map((item) => drink[item]);
  // refatorar para 1 função

  const history = useHistory();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState(false);
  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setBtnDisabled(doneRecipes
      .every((e) => e.name !== drink.strDrink));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const { drinks } = inProgressRecipes;
      setBtnText(Object.keys(drinks)
        .some((e) => e === drink.idDrink));
    }
  }, []);

  return (
    <div>
      <BtnFavorite recipe={ drink } type="drink" recipeId={ drink.idDrink } />
      <img
        src={ `${drink.strDrinkThumb}` }
        alt="drink"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <h2 data-testid="recipe-category">{drink.strAlcoholic}</h2>
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <li
              key={ item }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${measuresValues[index]} ${item}` }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>

      {
        btnDisabled && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
            onClick={ () => history.push(`/drinks/${drink.idDrink}/in-progress`) }
          >
            { btnText ? <span>Continue Recipe</span> : <span>Start Recipe</span> }
          </button>
        )
      }
    </div>
  );
}

export default DrinkDetailsPage;
