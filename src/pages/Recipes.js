import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiDish } from 'react-icons/bi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import '../styles/components/RecipeCard.css';
import convertFilters from '../helpers/convertMealsFilters';

const foodsRecipesMaxLength = 12;
const foodsCategorysMaxLength = 5;

function Recipes({ history, conditionalRecipe }) {
  const [foodsRecipes, setFoodsRecipes] = useState();
  const [foodsCategorys, setFoodsCategorys] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setFoodsRecipes(data.meals
        .map((e) => e).slice(0, foodsRecipesMaxLength)));

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setFoodsCategorys([
        'All',
        ...data.meals
          .map(({ strCategory }) => strCategory)
          .slice(0, foodsCategorysMaxLength),
      ]));
  }, []);

  const getFoodsByFilter = (event, category) => {
    event.preventDefault();
    let foodsFilterApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    if (category === 'All' || category === currentFilter) {
      foodsFilterApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    setCurrentFilter(category);
    fetch(foodsFilterApi)
      .then((response) => response.json())
      .then((data) => setFoodsRecipes(data.meals
        .map((e) => e).slice(0, foodsRecipesMaxLength)));
  };

  return (
    <div>
      <Header title="Meals" profileIcon searchIcon history={ history } />
      <div className="recipe-title">
        <BiDish />
        <h2>Meals</h2>
      </div>
      <nav className="nav-filters">
        {
          foodsCategorys
            .map((category) => (
              <button
                className="buttons-filter"
                key={ category }
                type="button"
                data-testid={ `${category}-category-filter` }
                onClick={ (e) => getFoodsByFilter(e, category) }
              >
                <div className="categories">
                  { convertFilters(category) }
                  <span>{category}</span>
                </div>
              </button>
            ))
        }
      </nav>
      <main className="recipes-container">
        { conditionalRecipe && foodsRecipes
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
            <p>Carregando...</p>
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
