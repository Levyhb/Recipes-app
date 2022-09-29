import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/Carrossel.css';
import IngredientsCheckbox from './IngredientsCheckbox';
import { getMealDetail } from '../redux/actions';

export default function MealInProgess() {
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
          />
          <p data-testid="instructions">{meal.strInstructions}</p>
        </>
      )}
    </div>
  );
}
