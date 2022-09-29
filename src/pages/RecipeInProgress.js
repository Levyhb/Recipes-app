import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/Carrossel.css';
import MealInProgess from '../components/MealInProgess';
import DrinkInProgress from '../components/DrinkInProgress';

export default function RecipeInProgress() {
  const location = useLocation();
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
