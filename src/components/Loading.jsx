import React from 'react';
import loadingImg from '../styles/images/loading-img.png';
import '../styles/components/Loading.css';

export default function Loading() {
  return (
    <div className="loading">
      <img src={ loadingImg } alt="Loading" />
    </div>
  );
}
