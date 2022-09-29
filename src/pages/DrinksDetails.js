import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import { getDrinkDetail } from '../redux/actions';
import '../styles/components/Carrossel.css';
import CarouselCard from '../components/CarouselCard';
import ArrowCarousel from '../components/ArrowCarousel';
import DrinkDetailsPage from '../components/DrinkDetailsPage';
import shareIcon from '../images/shareIcon.svg';

const mealsMaxLength = 6;

export default function DrinksDetails() {
  const dispatch = useDispatch();
  const [relatedFoods, setRelatedFoods] = useState();
  const carouselMealsRef = useRef(null);
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;

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

  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/drinks/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), timeInterval);
  };

  return (
    <div>
      <button
        onClick={ (event) => copyEndPoint(event) }
        type="button"
        data-testid="share-btn"
      >
        {recntCopied
          ? 'Link copied!'
          : <img src={ shareIcon } alt="share-button" />}
      </button>

      {
        drink && <DrinkDetailsPage />
      }
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
