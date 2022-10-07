import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [data, setData] = useState([]);
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;

  let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (doneRecipes === null) doneRecipes = [];
    setData(doneRecipes);
  }, []);

  const filterAll = () => {
    setData(doneRecipes);
  };

  const filterMeals = () => {
    setData(doneRecipes.filter((e) => e.type === 'meal'));
  };

  const filterDrinks = () => {
    setData(doneRecipes.filter((e) => e.type === 'drink'));
  };

  const copyEndPoint = (e) => {
    clipboardCopy(e);
    setCopied(true);
    setTimeout(() => setCopied(false), timeInterval);
  };
  return (
    <div>
      <Header title="Done Recipes" profileIcon />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {data.map((e, index) => (
        <section key={ e.id }>
          <Link to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
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
          {e.alcoholicOrNot && (
            <p data-testid={ `${index}-horizontal-top-text` }>{e.alcoholicOrNot}</p>
          )}
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {e.doneDate}
          </p>
          {e.tags && e.tags.map((tagElement) => (
            <p
              data-testid={ `${index}-${tagElement}-horizontal-tag` }
              key={ tagElement }
            >
              { tagElement }
            </p>
          ))}
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyEndPoint(e.url) }
          >
            { recntCopied ? 'Link copied!' : <img src={ shareIcon } alt="share-icon" />}
          </button>
        </section>
      ))}
    </div>
  );
}
