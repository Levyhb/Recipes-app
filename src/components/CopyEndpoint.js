import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

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
      className="share"
    >
      {recntCopied
        ? <p className="link-copied">Link Copied!</p>
        : (
          <lord-icon
            src="https://cdn.lordicon.com/udwhdpod.json"
            trigger="hover"
            colors="primary:#750505,secondary:#fcdc36"
            stroke="100"
            style={ { width: '55px', height: '55px' } }
          />
        )}
    </button>
  );
}

export default CopyEndpoint;
