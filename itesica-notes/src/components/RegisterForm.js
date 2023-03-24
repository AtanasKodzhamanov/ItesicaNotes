import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, success, registerUser } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(username, password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {success && <p>Registration successful! You can now log in.</p>}
    </div>
  );
};

export default RegisterForm;
