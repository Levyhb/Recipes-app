import React from 'react';
import '../styles/components/IngredientsCheckbox.css';

function IngredientsCheckbox({ingredientsValues, measuresValues}) {
  return (
    <div>
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ index }
            >
              <input type="checkbox" id={ index } />
              { `${measuresValues[index]} ${item}` }
            </label>
            // <li
            //   key={ item }
            //   data-testid={ `${index}-ingredient-name-and-measure` }
            // >
            //   { `${measuresValues[index]} ${item}` }
            // </li>
          ))
        }
      </ul>
    </div>
  );
}

export default IngredientsCheckbox;
