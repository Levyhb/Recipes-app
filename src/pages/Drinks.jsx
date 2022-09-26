import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Drinks({ history }) {
  return (
    <div>
      <Header title="Drinks" profileIcon searchIcon history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};
