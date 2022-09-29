import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) doneRecipes = [];
    setData(doneRecipes);
  }, []);
  return (
    <div>
      <Header title="Done Recipes" profileIcon />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {data.map((e, index) => (
        <section key={ e.id }>
          <img
            src={ e.image }
            alt={ e.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            {e.name}
          </h1>
          <h2
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${e.nationality} - ${e.category}`}
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
          >
            Compartilhar
          </button>
        </section>
      ))}
    </div>
  );
}
