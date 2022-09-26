import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <div className="footer-contents">
        <Link to="/drinks">
          <img
            className="footer-icons"
            src={ drinkIcon }
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            className="footer-icons"
            src={ mealIcon }
            alt="meal-icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}
