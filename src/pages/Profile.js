import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <div>
        <Header title="Profile" profileIcon={ false } searchIcon={ false } />
        <div>
          <p data-testid="profile-email">{ user !== null ? user.email : 'email' }</p>
        </div>
        <div>
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
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
