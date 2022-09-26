import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../helpers/fetchApi';

export default function SearchBar({ history: { push, location: { pathname } } }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [search, setSearch] = useState('');
  const [recipe, setRecipe] = useState([]);

  function handleChange({ target: { value } }) {
    setSelectedOption(value);
  }

  function handleInput({ target: { value } }) {
    setSearch(value);
  }

  async function onSubmitChange(e) {
    e.preventDefault();
    const result = await fetchApi(pathname, selectedOption, search);
    let nameRecipe = '';
    let path = '';
    if (pathname === '/meals' && result.meals !== null) {
      nameRecipe = 'meals';
      path = `${pathname}/${result.meals[0].idMeal}`;
    } else if (pathname === '/drinks' && result.drinks !== null) {
      nameRecipe = 'drinks';
      path = `${pathname}/${result.drinks[0].idDrink}`;
    }
    if (result[nameRecipe] === undefined) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (result[nameRecipe].length === 1) {
      push(path);
    } else {
      setRecipe(result[nameRecipe]);
    }
  }
  console.log(recipe);
  return (
    <form onSubmit={ onSubmitChange }>
      <input
        type="text"
        data-testid="search-input"
        value={ search }
        onChange={ handleInput }
      />
      <label htmlFor="ingredientSearch">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredientSearch"
          name="search"
          value="ingredient"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="nameSearch">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="nameSearch"
          name="search"
          value="name"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="search"
          value="firstLetter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
