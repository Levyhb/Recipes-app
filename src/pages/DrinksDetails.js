import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkDetail } from '../redux/actions';
import '../styles/components/Carrossel.css';
import CarouselCard from '../components/CarouselCard';
import ArrowCarousel from '../components/ArrowCarousel';
import DrinkDetailsPage from '../components/DrinkDetailsPage';

const mealsMaxLength = 6;

export default function DrinksDetails() {
  const dispatch = useDispatch();
  const [relatedFoods, setRelatedFoods] = useState();
  const carouselMealsRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getDrinkDetail(data)));

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRelatedFoods(data.meals.slice(0, mealsMaxLength)));
  }, []);
  const drink = useSelector((state) => state.drinks.drinkDetail);

  return (
    <div>
      {
        drink && <DrinkDetailsPage />
      }
      <div className="details-carousel">
        {!relatedFoods ? (
          <p>Carregando...</p>
        ) : (
          <div className="related-recipes">
            <h2>Related Meals</h2>
            <div
              className="carousel-container"
              ref={ carouselMealsRef }
            >
              {relatedFoods.map((food, index) => (
                <Link
                  to={ `/meals/${food.idMeal}` }
                  key={ food.idMeal }
                >
                  <CarouselCard
                    title={ food.strMeal }
                    thumb={ food.strMealThumb }
                    index={ index }
                    key={ food.idMeal }
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        <ArrowCarousel carousel={ carouselMealsRef } />
      </div>
    </div>
  );
}
