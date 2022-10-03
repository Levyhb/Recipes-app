import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/Carrossel.css';
import { useSelector } from 'react-redux';
import MealInProgess from '../components/MealInProgess';
import DrinkInProgress from '../components/DrinkInProgress';

export default function RecipeInProgress() {
  const location = useLocation();
  const key = { drinks: {}, meals: {} };
  const storageState = useSelector((state) => state.conditionalRecipe.recipesInProgress);
  const storage = localStorage.getItem('inProgressRecipes')
  console.log(storage)
  // if (storage === null) {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(key))
  // }
  useEffect(() => {
    // const key = { drinks: {}, meals: {} };
    // localStorage.setItem('inProgressRecipes', JSON.stringify(key));
  }, []);
  return (
    <div>
      {
        location.pathname.includes('meal') ? (
          <MealInProgess />
        ) : (<DrinkInProgress />
        )
      }
    </div>
  );
}
