import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Ingredients.css';
import { FaClipboardList } from 'react-icons/fa';

function IngredientsList({ ingredientsValues, measuresValues }) {
  return (
    <div className="ingredient-list">
      <h2 className="category-title">
        Ingredients
        {' '}
        <FaClipboardList />
      </h2>
      {' '}
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <li
              key={ item }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${measuresValues[index]} ${item}` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredientsValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  measuresValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsList;
