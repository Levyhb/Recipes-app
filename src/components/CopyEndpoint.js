import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CopyEndpoint() {
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 1000;
  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(window.location.href);
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
