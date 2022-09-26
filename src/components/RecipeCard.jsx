import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/RecipeCard.css';

export default function RecipeCard({ recipeName, recipeImg, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img src={ recipeImg } alt={ recipeName } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{recipeName}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
