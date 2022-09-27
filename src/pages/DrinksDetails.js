import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDrinkDetail } from '../redux/actions';
import DrinkDetailsPage from '../components/DrinkDetailsPage';

export default function DrinksDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getDrinkDetail(data)));
  }, []);
  const drink = useSelector((state) => state.drinks.drinkDetail);

  return (
    <div>
      {
        drink && <DrinkDetailsPage />
      }
    </div>
  );
}
