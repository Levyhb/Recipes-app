import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CgProfile } from "react-icons/cg";
import doneRecipeIcon from "../images/done-recipes-icon.svg";
import favoriteRecipesIcon from "../images/favorite-recipes-icon.svg";
import logoutIdocn from "../images/logout-icon.svg";
import "../styles/pages/Profile.css";


function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <div>
        <Header title="Profile" profileIcon searchIcon={ false } />
        <div className="title-profile">
          <CgProfile />
          <p data-testid="profile-email">{ user !== null ? user.email : 'email' }</p>
        </div>
        <div className="profile-links">
          <Link to="/done-recipes">
            <img src={ doneRecipeIcon } alt="done recipes icon" className="profile-icons"/>
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <img src={ favoriteRecipesIcon } alt="favorite recipes icon" className="profile-icons"/>
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
          <img src={ logoutIdocn } alt="logout icon" className="profile-icons"/>
            <button
              onClick={ () => localStorage.clear() }
              type="button"
              data-testid="profile-logout-btn"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
