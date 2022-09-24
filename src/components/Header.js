import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import '../styles/components/Header.css';
import SearchBar from './SearchBar';

export default function Header({ title, profileIcon, searchIcon }) {
  const [handleSearch, setHandleSearch] = useState(false);

  return (
    <header className="header">
      <div className="header-contents">
        <h2 data-testid="page-title">{ title }</h2>
        <div className="header-icons">
          {profileIcon && (
            <Link to="/profile">
              <img
                src={ profile }
                alt="profile-icon"
                data-testid="profile-top-btn"
              />
            </Link>
          )}
          {
            searchIcon && (
              <button type="button" onClick={ () => setHandleSearch(!handleSearch) }>
                <img
                  src={ search }
                  alt="search-button-icon"
                  data-testid="search-top-btn"
                />
              </button>
            )
          }
        </div>
      </div>
      { handleSearch && (
        <SearchBar />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profileIcon: PropTypes.bool.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};
