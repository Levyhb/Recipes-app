import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ArrowCarousel from '../components/ArrowCarousel';
import CarouselCard from '../components/CarouselCard';
import '../styles/components/Carrossel.css';

const maxDrinksLength = 6;

export default function RecipesDetails() {
  const [mealDetail, setMealDetail] = useState();
  const [recommendedDrinks, setRecommendedDrinks] = useState();
  const carouselDrinksRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setMealDetail(data));
    console.log(mealDetail);

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendedDrinks(data.drinks.slice(0, maxDrinksLength)));
  }, []);

  return (
    <div>
      RecipeDetails
      <div className="details-carousel">
        {!recommendedDrinks ? (
          <p>Carregando...</p>
        ) : (
          <div className="carousel-container" ref={ carouselDrinksRef }>
            {recommendedDrinks.map((drink, index) => (
              <CarouselCard
                title={ drink.strDrink }
                thumb={ drink.strDrinkThumb }
                index={ index }
                key={ drink.idDrink }
              />
            ))}
          </div>
        )}
        <ArrowCarousel carousel={ carouselDrinksRef } />
      </div>
    </div>
  );
}
