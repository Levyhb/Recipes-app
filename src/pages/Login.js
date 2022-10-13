import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/pages/Login.css';
import logo from '../styles/images/logo.png';
import { Tooltip } from 'react-tippy';


export default function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleInput = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  useEffect(() => {
    const verifyBtn = () => {
      const regex = /\S+@\S+\.\S+/;
      const minLength = 6;
      setIsBtnDisabled(!(regex.test(user.email) && user.password.length > minLength));
    };
    verifyBtn();
  }, [user]);

  const handleBtn = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <img
        className="logo"
        src={ logo }
        alt="logo"
      />
      <div><h1 className="title">Recipe App</h1></div>
      <div className="form-container">
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email"
          value={ user.email }
          onChange={ handleInput }
        />
        <Tooltip
          title="Your password must be longer than 6 characters"
          position="top"
          trigger="click"
        >
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Password"
            value={ user.password }
            onChange={ handleInput }
          />
        </Tooltip>
        <button
          data-testid="login-submit-btn"
          className="login-btn"
          type="submit"
          disabled={ isBtnDisabled }
          onClick={ handleBtn }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
