import React from 'react';

export default function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
      />
      <input
        data-testid="password-input"
        type="password"
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
