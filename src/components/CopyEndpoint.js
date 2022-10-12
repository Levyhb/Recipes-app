import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CopyEndpoint({ dataTestCopy, pathRecived, idRecived }) {
  const [recntCopied, setCopied] = useState(false);
  const timeInterval = 2500;
  const copyEndPoint = (event) => {
    event.preventDefault();
    clipboardCopy(`http://localhost:3000/${pathRecived}/${idRecived}`);
    setCopied(true);
    toast.success('Link Copied!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => setCopied(false), timeInterval);
  };

  return (
    <div>
      <button
        onClick={ (event) => copyEndPoint(event) }
        type="button"
        data-testid="share-btn"
        className="share"
      >
          <lord-icon
            className="lord-icon"
            src="https://cdn.lordicon.com/udwhdpod.json"
            trigger="click"
            colors="primary:#750505,secondary:#fcdc36"
            stroke="100"
            style={ { width: '55px', height: '55px' } }
          />
      </button>
      {recntCopied && (
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
        )}
    </div>
  );
}

CopyEndpoint.propTypes = {
  dataTestCopy: PropTypes.string.isRequired,
  pathRecived: PropTypes.string.isRequired,
  idRecived: PropTypes.string.isRequired,
};
export default CopyEndpoint;
