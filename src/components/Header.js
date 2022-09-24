import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import '../styles/components/Header.css';

export default function Header({ title, profileIcon, searchIcon }) {
  return (
    <header className="header">
      <h2 data-testId="page-title">{ title }</h2>
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
            <img
              src={ search }
              alt="search-button-icon"
              data-testid="search-top-btn"
            />
          )
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profileIcon: PropTypes.bool.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};
