import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMealDetail } from '../redux/actions';
import '../styles/components/Carrossel.css';
import BtnFavorite from './BtnFavorite';
import IngredientsCheckbox from './IngredientsCheckbox';
import CopyEndpoint from './CopyEndpoint';

export default function MealInProgess() {
  const [handleFinishButton, setHandleFinishButton] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getMealDetail(data)));
  }, []);

  const meal = useSelector((state) => state.meals.mealDetail);
  let ingredientsValues = [];
  let measuresValues = [];
  if (meal) {
    const ingredientsKeys = Object.keys(meal).filter((item) => item
      .includes('Ingredient') && meal[item] !== null);
    ingredientsValues = ingredientsKeys.map((item) => meal[item])
      .filter((item) => item !== '');
    const measuresKeys = Object.keys(meal).filter((item) => item
      .includes('Measure') && meal[item] !== null);
    measuresValues = measuresKeys.map((item) => meal[item]);
  }
  // refatorar para 1 função
  return (
    <div>
      { meal && (
        <>
          <CopyEndpoint />

          <BtnFavorite recipe={ meal } type="meal" recipeId={ id } />
          <img
            src={ `${meal.strMealThumb}` }
            alt="meal"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{meal.strMeal}</h1>
          <h2 data-testid="recipe-category">{meal.strCategory}</h2>
          <IngredientsCheckbox
            measuresValues={ measuresValues }
            ingredientsValues={ ingredientsValues }
            setHandleFinishButton={ setHandleFinishButton }
          />
          <p data-testid="instructions">{meal.strInstructions}</p>
          <Link to="/done-recipes">
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ handleFinishButton }
            >
              Finish Recipe
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
