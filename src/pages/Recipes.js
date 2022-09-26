import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link
              to={ `/meals/${meal.idMeal}` }
              key={ meal.idMeal }
            >
              <RecipeCard
                recipeName={ meal.strMeal }
                recipeImg={ meal.strMealThumb }
                index={ index }
              />
            </Link>
          )) : (
            // Criar componente de Loading
            <p>carregando...</p>
          )}

      </main>
      <Footer />
    </div>
  );
}
