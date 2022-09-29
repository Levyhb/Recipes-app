import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../styles/components/IngredientsCheckbox.css';
import { updateCheckedStates } from '../redux/actions';

function IngredientsCheckbox({ ingredientsValues, measuresValues }) {
  const dispatch = useDispatch();
  const states = {};
  ingredientsValues.forEach((_, index) => { states[index] = false; });
  const [state, setState] = useState(states);

  const handleChecked = ({ target }) => {
    const { id, checked } = target;
    setState((prev) => ({
      ...prev,
      [id]: checked,
    }));
    const obj = { [target.id]: target.checked };
    dispatch(updateCheckedStates(obj));
    return target.checked;
  };

  return (
    <div>
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ index }
              className={ state[index] ? 'checkedInput' : 'false' }
            >
              <input
                type="checkbox"
                id={ index }
                onClick={ handleChecked }
              />
              { `${measuresValues[index]} ${item}` }
            </label>
          ))
        }
      </ul>
    </div>
  );
}

IngredientsCheckbox.propTypes = {
  ingredientsValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  measuresValues: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsCheckbox;
