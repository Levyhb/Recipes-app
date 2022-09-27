import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import '../styles/components/RecipeCard.css';

const drinksMaxLength = 12;
const drinksCategorysMaxLength = 5;

export default function Drinks({ history }) {
  const [drinksRecipes, setDrinksRecipes] = useState();
  const [drinkCategorys, setDrinksCategorys] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinksRecipes(data.drinks
        .map((e) => e).slice(0, drinksMaxLength)));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setDrinksCategorys([
        'All',
        ...data.drinks
          .map(({ strCategory }) => strCategory)
          .slice(0, drinksCategorysMaxLength),
      ]));
  }, []);

  const getDinksByFilter = (event, category) => {
    event.preventDefault();
    let drinksFilterApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (category === 'All' || category === currentFilter) {
      drinksFilterApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    setCurrentFilter(category);
    fetch(drinksFilterApi)
      .then((response) => response.json())
      .then((data) => setDrinksRecipes(data.drinks
        .map((e) => e).slice(0, drinksMaxLength)));
  };

  return (
    <div>
      <Header title="Drinks" profileIcon searchIcon history={ history } />
      <nav>
        {
          drinkCategorys
            .map((category) => (
              <button
                key={ category }
                type="button"
                data-testid={ `${category}-category-filter` }
                onClick={ (e) => getDinksByFilter(e, category) }
              >
                {category}
              </button>
            ))
        }
      </nav>
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
