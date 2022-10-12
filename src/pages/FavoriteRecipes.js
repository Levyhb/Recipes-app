import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BtnFavorite from '../components/BtnFavorite';
import CopyEndpoint from '../components/CopyEndpoint';
import '../styles/components/RecipeCard.css';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GiMeal } from 'react-icons/gi';
import { IoIosWine } from 'react-icons/io';

function FavoriteRecipes() {
  const [favRecipes, setFavs] = useState([]);
  // const [data, setData] = useState('');
  const childToParent = (childdata) => {
    setFavs([...childdata]);
    console.log(childdata);
  };

  const getLocal = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    const getFavs = async () => {
      const favRecps = getLocal();
      if (favRecps) {
        setFavs(favRecps);
      }
    };
    getFavs();
  }, []);

  const filterBy = (filtType) => {
    const favRecps = getLocal();
    if (favRecps) {
      switch (filtType) {
      case 'meal': {
        const byFood = favRecps.filter(({ type }) => type === 'meal');
        setFavs(byFood);
        break;
      }
      case 'drink': {
        const byDrink = favRecps.filter(({ type }) => type === 'drink');
        setFavs(byDrink);
        break;
      }
      default:
        setFavs(favRecps);
        break;
      }
    }
  };

  const renderFavCards = () => (
    [...favRecipes].map((r, i) => {
      const recpObj = r.type === 'meal'
        ? {
          strMeal: r.name,
          strMealThumb: r.image,
          strArea: r.area,
          strCategory: r.category,
        }
        : {
          strDrink: r.name,
          strDrinkThumb: r.image,
          strAlcoholic: r.alcoholicOrNot,
          strCategory: r.category,
        };
      const adtionalInfo = r.type === 'meal'
        ? `${r.nationality} - ${r.category}` : r.alcoholicOrNot;
      const endP = r.type === 'meal' ? `/meals/${r.id}` : `/drinks/${r.id}`;
      // console.log(r);
      return (
        <div key={ r.name } className="done-favorites-recipe-page">
          <div className='recipe-card-container'>
            <div className="done-favorites-recipe-card">
              <Link to={ endP }>
                <div>
                  <img
                    src={ r.image }
                    alt={ r.name }
                    data-testid={ `${i}-horizontal-image` }
                  />
                </div>
              </Link>
              <div className="recipe-info">
                <h1 data-testid={ `${i}-horizontal-name` }>{ r.name }</h1>
                <h2 data-testid={ `${i}-horizontal-top-text` }>{ adtionalInfo }</h2>
              </div>
              <div className='favorites-recipe-card-btn'>
                <CopyEndpoint
                  dataTestCopy={ `${i}-horizontal-share-btn` }
                  pathRecived={ `${r.type}s` }
                  idRecived={ r.id }
                />
                <BtnFavorite
                  recipe={ recpObj }
                  type={ `${r.type}s` }
                  recipeId={ r.id }
                  listIndex={ i }
                  setFavs={ setFavs }
                  dataTest={ `${i}-horizontal-favorite-btn` }
                  childToParent={ childToParent }
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    })
  );
  return (
    <div>
      <Header canSearch={ false } text="Receitas Favoritas" />
      <div className='nav-filters'>
        <button
          type="submit"
          onClick={ () => filterBy('all') }
          data-testid="filter-by-all-btn"
          className="buttons-filter"
        >
          <IoFastFoodSharp />
          <span>All</span>
        </button>
        <button
          type="submit"
          onClick={ () => filterBy('meal') }
          data-testid="filter-by-meal-btn"
          className="buttons-filter"
        >
          < GiMeal />
          <span>Meals</span>
        </button>
        <button
          type="submit"
          onClick={ () => filterBy('drink') }
          className="buttons-filter"
          data-testid="filter-by-drink-btn"
        >
          <IoIosWine />
          <span>Drinks</span>
        </button>
      </div>
      {renderFavCards()}
    </div>
  );
}

export default FavoriteRecipes;
