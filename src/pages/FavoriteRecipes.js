import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BtnFavorite from '../components/BtnFavorite';
import CopyEndpoint from '../components/CopyEndpoint';
import '../styles/components/RecipeCard.css';

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
        <div key={ r.name }>
          <div className="recipe-card">
            <Link to={ endP }>
              <div>
                <img
                  src={ r.image }
                  alt={ r.name }
                  data-testid={ `${i}-horizontal-image` }
                />
                <span data-testid={ `${i}-horizontal-name` }>{ r.name }</span>
              </div>
            </Link>
            <div>
              <h5 data-testid={ `${i}-horizontal-top-text` }>{ adtionalInfo }</h5>
            </div>
          </div>

          <div>
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
          <hr />
        </div>
      );
    })
  );
  return (
    <div className="recipes-container">
      <Header canSearch={ false } text="Receitas Favoritas" />
      <div>
        <button
          type="submit"
          onClick={ () => filterBy('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="submit"
          onClick={ () => filterBy('meal') }
          data-testid="filter-by-meal-btn"
        >
          Food
        </button>
        <button
          type="submit"
          onClick={ () => filterBy('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {renderFavCards()}
    </div>
  );
}

export default FavoriteRecipes;
