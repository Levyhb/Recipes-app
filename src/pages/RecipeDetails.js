import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import { getMealDetail } from '../redux/actions';
import ArrowCarousel from '../components/ArrowCarousel';
import CarouselCard from '../components/CarouselCard';
import '../styles/components/Carrossel.css';
import MealDetailsPage from '../components/MealDetailsPage';
import shareIcon from '../images/shareIcon.svg';

const maxDrinksLength = 6;

export default function RecipesDetails() {
  const dispatch = useDispatch();
  const [recommendedDrinks, setRecommendedDrinks] = useState();
  const carouselDrinksRef = useRef(null);
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getMealDetail(data)));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecommendedDrinks(data.drinks.slice(0, maxDrinksLength)));
  }, []);
  const meal = useSelector((state) => state.meals.mealDetail);

  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/meals/${id}`);
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

      {/* <BtnFavorite recipe={ meal } type="comidas" recipeId={ id } /> */}

      {
        meal && <MealDetailsPage />
      }
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
