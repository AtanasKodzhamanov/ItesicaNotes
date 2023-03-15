// useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api-token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        localStorage.setItem('authToken', authToken);
        setAuthToken(authToken);
        setIsLoggedIn(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (error) {
      setError({ non_field_errors: ['An error occurred while logging in.'] });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    authToken,
    loginUser,
    logoutUser,
    error,
  };
};

export default useAuth;
