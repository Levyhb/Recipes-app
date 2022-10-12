import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoFastFoodSharp } from "react-icons/io5";
import { IoIosWine } from "react-icons/io";
import { GiMeal } from "react-icons/gi"
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/pages/DoneFavorites.css';

export default function DoneRecipes() {
  const [data, setData] = useState([]);
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 2500;

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
    toast.success('Link Copied!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => setCopied(false), timeInterval);
  };

  return (
    <div className="done-favorites-recipes-page">
      <Header title="Done Recipes" profileIcon />
      <div className='nav-filters'>
        <button
          className="buttons-filter"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          <IoFastFoodSharp />
          <span>All</span>
        </button>
        <button
          className="buttons-filter"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterMeals }
        >
          < GiMeal />
          <span>Meals</span>
        </button>
        <button
          className="buttons-filter"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          <IoIosWine />
          <span>Drinks</span>
        </button>
      </div>

      <div className='recipe-card-container'>
        {data.map((e, index) => (
          <section key={ e.id } className="done-favorites-recipe-card">
            <Link to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
              <img
                src={ e.image }
                alt={ e.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>

            <div className="recipe-info">
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
                {
                  `- ${e.category} ${e.alcoholicOrNot === 'Alcoholic' ? 'Alcoholic' : ''}`
                }
              </h2>

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
            </div>
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyEndPoint(e.url) }
              className="share"
            >
              <lord-icon
                src="https://cdn.lordicon.com/udwhdpod.json"
                trigger="hover"
                colors="primary:#750505,secondary:#fcdc36"
                stroke="100"
                style={ { width: '45px', height: '45px' } }
              />
            </button>
          </section>
        ))}
        {recntCopied && (
          <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
        )
        }
      </div>
    </div>
  );
}
