import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/Carrossel.css';
import CarouselCard from '../components/CarouselCard';
import ArrowCarousel from '../components/ArrowCarousel';

const mealsMaxLength = 6;

export default function DrinksDetails() {
  const [drinkDetails, setDrinkDetails] = useState();
  const [relatedFoods, setRelatedFoods] = useState();
  const carouselMealsRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDrinkDetails(data));
    console.log(drinkDetails);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRelatedFoods(data.meals.slice(0, mealsMaxLength)));
    console.log(relatedFoods);
  }, []);

  return (
    <div>
      DrinksDetails
      <div className="details-carousel">
        {!relatedFoods ? (
          <p>Carregando...</p>
        ) : (
          <div
            className="carousel-container"
            ref={ carouselMealsRef }
          >
            {relatedFoods.map((food, index) => (
              <CarouselCard
                title={ food.strMeal }
                thumb={ food.strMealThumb }
                index={ index }
                key={ food.idMeal }
              />
            ))}
          </div>
        )}
        <ArrowCarousel carousel={ carouselMealsRef } />
      </div>
    </div>
  );
}
