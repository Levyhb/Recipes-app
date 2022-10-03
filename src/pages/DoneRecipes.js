import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
// import DoneRecipeCard from '../components/DoneRecipeCard';
import share from '../images/shareIcon.svg';
import Header from '../components/Header';
import '../styles/components/DoneRecipeCard.css';

export default function DoneRecipes() {
  const [data, setData] = useState([]);
  const [recntCopied, setCopied] = useState(false);

  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setData(doneRecipes);
  }, []);

  const timeInterval = 1000;
  const copyEndPoint = (event, type, id) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), timeInterval);
  };

  const filterType = (type) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const dataFiltered = doneRecipes.filter((e) => e.type === type);
    setData(dataFiltered);
  };

  const removeFilter = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setData(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" profileIcon />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ removeFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterType('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterType('drink') }
      >
        Drinks
      </button>
      {data.map((e, index) => (
        // <DoneRecipeCard
        //   key={ e.name }
        //   index={ index }
        //   type={ e.type }
        //   id={ e.id }
        //   image={ e.image }
        //   name={ e.name }
        //   nationality={ e.nationality }
        //   category={ e.category }
        //   alcoholicOrNot={ e.alcoholicOrNot }
        //   doneDate={ e.doneDate }
        //   tags={ e.tags }

        // />
        <section key={ e.name }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
              className="doneRecipe-img "
            />
          </Link>
          <Link to={ `/${e.type}s/${e.id}` }>
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {e.name}
            </h1>
          </Link>
          <h2
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${e.nationality} - ${e.category} ${e.alcoholicOrNot}`}
          </h2>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {e.doneDate}
          </p>
          {e.tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
          <button
            src={ share }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ (event) => copyEndPoint(event, e.type, e.id) }
          >
            {recntCopied
              ? 'Link copied!'
              : <img src={ share } alt="share-button" />}
          </button>
        </section>
      ))}
    </div>
  );
}
