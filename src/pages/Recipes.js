import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import '../styles/components/RecipeCard.css';

const foodsRecipesMaxLength = 12;

function Recipes({ history, conditionalRecipe }) {
  const [foodsRecipes, setFoodsRecipes] = useState();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setFoodsRecipes(data.meals
        .map((e) => e).slice(0, foodsRecipesMaxLength)));
  }, []);

  return (
    <div>
      <Header title="Meals" profileIcon searchIcon history={ history } />
      <main className="recipes-container">
        { conditionalRecipe && foodsRecipes
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

Recipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
  conditionalRecipe: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  conditionalRecipe: state.conditionalRecipe.conditionalRecipes,
});

export default connect(mapStateToProps)(Recipes);
