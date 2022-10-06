import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/Carrossel.css';
import IngredientsCheckbox from './IngredientsCheckbox';
import { getDrinkDetail } from '../redux/actions';
import BtnFavorite from './BtnFavorite';
import CopyEndpoint from './CopyEndpoint';
import FinishBtn from './FinishBtn';

export default function DrinkInProgess() {
  const [handleFinishButton, setHandleFinishButton] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getDrinkDetail(data)));
  }, []);
  let ingredientsValues = [];
  let measuresValues = [];
  const drink = useSelector((state) => state.drinks.drinkDetail);
  if (drink) {
    const ingredientsKeys = Object.keys(drink).filter((item) => item
      .includes('Ingredient') && drink[item] !== null);
    ingredientsValues = ingredientsKeys.map((item) => drink[item])
      .filter((item) => item !== '');
    const measuresKeys = Object.keys(drink).filter((item) => item
      .includes('Measure') && drink[item] !== null);
    measuresValues = measuresKeys.map((item) => drink[item]);
  }
  // refatorar para 1 função
  return (
    <div>
      { drink && (
        <>
          {console.log(drink)}
          <CopyEndpoint />
          <BtnFavorite recipe={ drink } type="drink" recipeId={ drink.idDrink } />
          <img
            src={ `${drink.strDrinkThumb}` }
            alt="drink"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{drink.strDrink}</h1>
          <h2 data-testid="recipe-category">{drink.strAlcoholic}</h2>
          <IngredientsCheckbox
            measuresValues={ measuresValues }
            ingredientsValues={ ingredientsValues }
            setHandleFinishButton={ setHandleFinishButton }
          />
          <p data-testid="instructions">{drink.strInstructions}</p>
          <Link to="/done-recipes">
            <FinishBtn
              recipe={ drink }
              type="drink"
              recipeId={ id }
              handleFinishButton={ handleFinishButton }
            />
          </Link>
        </>
      )}
    </div>
  );
}
