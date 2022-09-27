import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import '../styles/components/RecipeCard.css';

const drinksMaxLength = 12;

export default function Drinks({ history }) {
  const [drinksRecipes, setDrinksRecipes] = useState();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinksRecipes(data.drinks
        .map((e) => e).slice(0, drinksMaxLength)));
  }, []);

  return (
    <div>
      <Header title="Drinks" profileIcon searchIcon history={ history } />
      <main className="recipes-container">
        { drinksRecipes
          ? drinksRecipes.map((drink, index) => (
            <RecipeCard
              key={ drink.idDrink }
              recipeName={ drink.strDrink }
              recipeImg={ drink.strDrinkThumb }
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

Drinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};
