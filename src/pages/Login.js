import React, { useState, useEffect } from 'react';

export default function Login() {
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

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        name="email"
        value={ user.email }
        onChange={ handleInput }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ user.password }
        onChange={ handleInput }
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ isBtnDisabled }
        // onClick={ handleBtn }
      >
        Enter
      </button>
    </div>
  );
}
