import React from 'react';
import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
import { BiDish, BiDrink } from 'react-icons/bi';
// import mealIcon from '../styles/images/food-icon.png';
import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <div className="footer-contents">
        <Link to="/drinks" className="icon">
          {/* <img
            className="footer-icons"
            src={ drinkIcon }
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          /> */}
          <BiDrink />
        </Link>
        <Link to="/meals" className="icon">
          <BiDish />
        </Link>
      </div>
    </footer>
  );
}
