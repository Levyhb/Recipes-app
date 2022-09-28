import React from 'react';
import '../styles/components/Carrossel.css';
import PropTypes from 'prop-types';

export default function CarouselCard({ title, thumb, index }) {
  return (
    <div data-testid={ `${index}-recommendation-card` } className="carousel-card">
      <img src={ thumb } alt={ title } />
      <h2 data-testid={ `${index}-recommendation-title` }>{ title }</h2>
    </div>
  );
}

CarouselCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
