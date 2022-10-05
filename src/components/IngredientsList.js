import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ ingredientsValues, measuresValues }) {
  return (
    <div className="ingredient-list">
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
