import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css';
import SearchBar from './SearchBar';
import logo from '../styles/images/logo.png';

export default function Header({ profileIcon, searchIcon, history }) {
  const [handleSearch, setHandleSearch] = useState(false);

  return (
    <header className="header">
      <div className="header-contents">
        <h2 data-testid="page-title">
          <Link to="/meals">
            Recipes App
            <img src={ logo } alt="" />
          </Link>
        </h2>
        <div className="header-icons">
          {
            searchIcon && (
              <button
                className="icon"
                type="button"
                onClick={ () => setHandleSearch(!handleSearch) }
              >
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="hover"
                  colors="primary:#fcdc36,secondary:#fcdc36"
                  stroke="100"
                  style={ { width: '50px', height: '50px' } }
                />
              </button>
            )
          }
          {profileIcon && (
            <Link to="/profile" className="icon">
              <lord-icon
                src="https://cdn.lordicon.com/dxjqoygy.json"
                trigger="hover"
                colors="primary:#fcdc36,secondary:#fcdc36"
                stroke="100"
                style={ { width: '50px', height: '50px' } }
              />
            </Link>
          )}
        </div>
      </div>
      { handleSearch && (
        <SearchBar history={ history } />
      )}
    </header>
  );
}

Header.propTypes = {
  profileIcon: PropTypes.bool.isRequired,
  searchIcon: PropTypes.bool.isRequired,
  history: PropTypes.shape({
  }).isRequired,
};
