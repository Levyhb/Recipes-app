import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiSearchAlt } from 'react-icons/bi';
import '../styles/components/Header.css';
import SearchBar from './SearchBar';
import logo from '../styles/images/logo.png';

export default function Header({ profileIcon, searchIcon, history }) {
  const [handleSearch, setHandleSearch] = useState(false);

  return (
    <header className="header">
      <div className="header-contents">
        <h2 data-testid="page-title">
          Recipes App
          <img src={ logo } alt="" />
        </h2>
        <div className="header-icons">
          {profileIcon && (
            <Link to="/profile" className="icon">
              {/* <img
                src={ profile }
                alt="profile-icon"
                data-testid="profile-top-btn"
              /> */}
              <CgProfile />
            </Link>
          )}
          {
            searchIcon && (
              <button
                className="icon"
                type="button"
                onClick={ () => setHandleSearch(!handleSearch) }
              >
                <BiSearchAlt />
              </button>
            )
          }
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
