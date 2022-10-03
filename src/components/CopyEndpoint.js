import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CopyEndpoint() {
  const { id } = useParams();
  const path = window.location.href.includes('meals') ? 'meals' : 'drinks';

  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;
  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/${path}/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), timeInterval);
  };

  return (
    <button
      onClick={ (event) => copyEndPoint(event) }
      type="button"
      data-testid="share-btn"
    >
      {recntCopied
        ? 'Link copied!'
        : <img src={ shareIcon } alt="share-button" />}
    </button>
  );
}

export default CopyEndpoint;
