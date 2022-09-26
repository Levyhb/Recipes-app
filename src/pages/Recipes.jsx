import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Recipes({ history }) {
  return (
    <div>
      <Header title="Meals" profileIcon searchIcon history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};
