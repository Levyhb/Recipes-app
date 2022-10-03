import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../styles/components/IngredientsCheckbox.css';
import { updateCheckedStates } from '../redux/actions';

function IngredientsCheckbox({ ingredientsValues,
  measuresValues, setHandleFinishButton }) {
  const dispatch = useDispatch();
  const states = {};
  ingredientsValues.forEach((_, index) => { states[index] = false; });
  const [checkState, setCheckState] = useState(states);

  const verifyAllChecks = () => {
    setHandleFinishButton(!Object.values(checkState).every((e) => e === true));
  };

  const handleChecked = ({ target }) => {
    const { id, checked } = target;
    setCheckState((prev) => ({
      ...prev,
      [id]: checked,
    }));
    const obj = { [target.id]: target.checked };
    dispatch(updateCheckedStates(obj));
    verifyAllChecks();
    return target.checked;
  };

  useEffect(() => {
    verifyAllChecks();
  }, [checkState]);

  return (
    <div>
      <ul>
        {
          ingredientsValues.map((item, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ item }
              htmlFor={ index }
              className={ checkState[index] ? 'checkedInput' : 'false' }
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
  setHandleFinishButton: PropTypes.func.isRequired,
};

export default IngredientsCheckbox;
