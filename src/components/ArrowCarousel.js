import React from 'react';
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';
import '../styles/components/Carrossel.css';
import PropTypes from 'prop-types';

export default function ArrowCarousel({ carousel }) {
  const handleLeftClick = (e, ref) => {
    e.preventDefault();
    ref.current.scrollLeft -= ref.current.offsetWidth;
  };

  const handleRightClick = (e, ref) => {
    e.preventDefault();
    ref.current.scrollLeft += ref.current.offsetWidth;
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className="arrow left"
        onClick={ (e) => handleLeftClick(e, carousel) }
      >
        <AiFillLeftCircle />
      </button>
      <button
        type="button"
        className="arrow right"
        onClick={ (e) => handleRightClick(e, carousel) }
      >
        <AiFillRightCircle />
      </button>
    </div>
  );
}

ArrowCarousel.propTypes = {
  carousel: PropTypes.objectOf().isRequired,
};
