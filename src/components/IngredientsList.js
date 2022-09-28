import React from 'react';

function IngredientsList({ingredientsValues, measuresValues}) {
  return (
    <div>
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

export default IngredientsList;
