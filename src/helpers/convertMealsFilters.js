import { BiDish } from 'react-icons/bi';

import breakfast from '../styles/images/breakfast.png';
import chicken from '../styles/images/chicken.png';
import cow from '../styles/images/cow.png';
import sheep from '../styles/images/sheep.png';
import shortcake from '../styles/images/shortcake.png';

export default function convertDrinkFilters(category) {
  if (category === 'All') {
    return (<BiDish />);
  }

  if (category === 'Beef') {
    return (<img src={ cow } alt={ category } />);
  }

  if (category === 'Breakfast') {
    return (<img src={ breakfast } alt={ category } />);
  }

  if (category === 'Chicken') {
    return (<img src={ chicken } alt={ category } />);
  }

  if (category === 'Dessert') {
    return (<img src={ shortcake } alt={ category } />);
  }

  if (category === 'Goat') {
    return (<img src={ sheep } alt={ category } />);
  }

  return category;
}
