import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
// import { renderFavCards } from '../pages/FavoriteRecipes';

function CopyEndpoint({ dataTestCopy, pathRecived, idRecived }) {
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;
  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/${pathRecived}/${idRecived}`);
    setCopied(true);
    setTimeout(() => setCopied(false), timeInterval);
  };

  return (
    <button
      onClick={ (event) => copyEndPoint(event) }
      type="button"
    >
      {recntCopied
        ? 'Link copied!'
        : <img src={ shareIcon } alt="share-button" data-testid={ dataTestCopy } />}
    </button>
  );
}

CopyEndpoint.propTypes = {
  dataTestCopy: PropTypes.string.isRequired,
  pathRecived: PropTypes.string.isRequired,
  idRecived: PropTypes.string.isRequired,
};
export default CopyEndpoint;
