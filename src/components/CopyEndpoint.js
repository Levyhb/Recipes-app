import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';


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
      data-testid="share-btn"
      className="share"
    >
      {recntCopied
        ? <p className="link-copied">Link Copied!</p>
        : (
          <lord-icon
            className="lord-icon"
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

CopyEndpoint.propTypes = {
  dataTestCopy: PropTypes.string.isRequired,
  pathRecived: PropTypes.string.isRequired,
  idRecived: PropTypes.string.isRequired,
};
export default CopyEndpoint;
