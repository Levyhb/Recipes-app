import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/components/DetailsPage.css';

function MealDetailsPage() {
  const meal = useSelector((state) => state.meals.mealDetail);
  const ingredientsKeys = Object.keys(meal).filter((item) => item
    .includes('Ingredient') && meal[item] !== null);
  const ingredientsValues = ingredientsKeys.map((item) => meal[item]);
  const measuresKeys = Object.keys(meal).filter((item) => item
    .includes('Measure') && meal[item] !== null);
  const measuresValues = measuresKeys.map((item) => meal[item]);
  // refatorar para 1 função
  const min = 32;
  const max = 44;
  const embled = meal.strYoutube.slice(min, max);

  const history = useHistory();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState(false);
  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setBtnDisabled(doneRecipes
      .every((e) => e.name !== meal.strMeal));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const { meals } = inProgressRecipes;
      setBtnText(Object.keys(meals)
        .every((e) => e === meal.idMeal));
    }
  }, []);

  return (
    <div>
      <img
        src={ `${meal.strMealThumb}` }
        alt="meal"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <h2 data-testid="recipe-category">{meal.strCategory}</h2>
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
      <p data-testid="instructions">{meal.strInstructions}</p>
      { meal && (<iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${embled}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />)}
      {
        btnDisabled && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
            onClick={ () => history.push(`/meals/${meal.idMeal}/in-progress`) }
          >
            { btnText ? <span>Continue Recipe</span> : <span>Start Recipe</span> }
          </button>
        )
      }
    </div>
  );
}

export default MealDetailsPage;
