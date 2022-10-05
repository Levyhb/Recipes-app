import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineShare } from 'react-icons/hi';
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
        : <HiOutlineShare />}
    </button>
  );
}

export default CopyEndpoint;
