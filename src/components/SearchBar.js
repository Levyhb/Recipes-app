import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../helpers/fetchApi';
import RecipeCard from './RecipeCard';
import foodsRecipes from '../redux/actions';

const maxRecipeLength = 12;

function SearchBar({ history: { push, location: { pathname } }, dispatch }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState('');
  const [str, setStr] = useState('');
  const [thumb, setThumb] = useState('');

  function handleChange({ target: { value } }) {
    setSelectedOption(value);
  }

  function handleInput({ target: { value } }) {
    setSearch(value);
  }

  async function onSubmitChange(e) {
    e.preventDefault();
    const data = await fetchApi(pathname, selectedOption, search);
    const removeStr = pathname.replace(/s/g, '').replace('/', '');
    const capitalizeFirstLetter = removeStr.charAt(0).toUpperCase() + removeStr.slice(1);
    const nameRecipe = `${removeStr}s`;
    const idApi = `id${capitalizeFirstLetter}`;
    const strApi = `str${capitalizeFirstLetter}`;
    const thumbApi = `str${capitalizeFirstLetter}Thumb`;
    setId(idApi);
    setStr(strApi);
    setThumb(thumbApi);
    if (data[nameRecipe] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data[nameRecipe].length === 1) {
      const path = `${pathname}/${data[nameRecipe][0][`id${capitalizeFirstLetter}`]}`;
      push(path);
    } else {
      setRecipes(data[nameRecipe]);
      dispatch((foodsRecipes(false)));
    }
  }
  return (
    <div>
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
      <section>
        {recipes.map((recipe, index) => index < maxRecipeLength
        && (
          <RecipeCard
            key={ recipe[id] }
            recipeName={ recipe[str] }
            recipeImg={ recipe[thumb] }
            index={ index }
          />
        ))}
      </section>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
