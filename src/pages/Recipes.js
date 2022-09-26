import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import '../styles/components/RecipeCard.css';

const foodsRecipesMaxLength = 12;

export default function Recipes() {
  const [foodsRecipes, setFoodsRecipes] = useState();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setFoodsRecipes(data.meals
        .map((e) => e).slice(0, foodsRecipesMaxLength)));
  }, []);

  return (
    <div>
      <Header title="Meals" profileIcon searchIcon />
      <main className="recipes-container">
        { foodsRecipes
          ? foodsRecipes.map((meal, index) => (
            <RecipeCard
              key={ meal.idMeal }
              recipeName={ meal.strMeal }
              recipeImg={ meal.strMealThumb }
              index={ index }
            />
          )) : (
            // Criar componente de Loading
            <p>carregando...</p>
          )}

      </main>
      <Footer />
    </div>
  );
}
