import React from 'react';
import PropTypes from 'prop-types';

let recipeMockUp = {
  id: '',
  type: '',
  nationality: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
  doneDate: '',
  tags: '',
};

export default function FinishBtn({ recipe, type, recipeId, handleFinishButton }) {
  const currentlyDate = (new Date()).toLocaleDateString();
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const {
    strCategory,
    strArea,
    strAlcoholic,
    strMealThumb,
    strMeal,
    strDrink,
    strDrinkThumb,
    strTags,
  } = recipe;

  recipeMockUp = type === 'meal'
    ? {
      id: recipeId,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: null,
      name: strMeal,
      image: strMealThumb,
      doneDate: currentlyDate,
      tags: strTags.split(','),
    }
    : {
      id: recipeId,
      type: 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: currentlyDate,
      tags: null,
    };

  const saveDoneRecipe = () => {
    if (getDoneRecipes) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...getDoneRecipes, recipeMockUp]),
      );
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeMockUp]));
    }
    console.log(currentlyDate);
  };

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ handleFinishButton }
      onClick={ saveDoneRecipe }
    >
      Finish Recipe
    </button>
  );
}

FinishBtn.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  recipeId: PropTypes.string.isRequired,
  handleFinishButton: PropTypes.bool.isRequired,
};
