import React from 'react';
import { BiDrink } from 'react-icons/bi';

import beerOthers from '../styles/images/beer-others.png';
import cocktail from '../styles/images/cocktail.png';
import coffe from '../styles/images/coffe.png';
import wine from '../styles/images/wine.png';
import shake from '../styles/images/shake.png';

export default function convertDrinkFilters(category) {
  if (category === 'All') {
    return (<BiDrink />);
  }

  if (category === 'Ordinary Drink') {
    return (<img src={ wine } alt={ category } />);
  }

  if (category === 'Cocktail') {
    return (<img src={ cocktail } alt={ category } />);
  }

  if (category === 'Shake') {
    return (<img src={ shake } alt={ category } />);
  }

  if (category === 'Other/Unknown') {
    return (<img src={ beerOthers } alt={ category } />);
  }

  if (category === 'Cocoa') {
    return (<img src={ coffe } alt={ category } />);
  }

  return category;
}
