import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MealDetailsPage from '../components/MealDetailsPage';
import { getMealDetail } from '../redux/actions';

export default function RecipesDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getMealDetail(data)));
  }, []);
  const meal = useSelector((state) => state.meals.mealDetail);

  return (
    <div>
      {
        meal && <MealDetailsPage />
      }

    </div>
  );
}
