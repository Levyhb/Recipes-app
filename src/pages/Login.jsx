import React, { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleInput = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

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
      >
        Enter
      </button>
    </div>
  );
}
