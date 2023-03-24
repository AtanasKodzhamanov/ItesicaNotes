// useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Add a new state variable for userId

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem("username");

    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
    if (storedUserId) {
      setUserId(storedUserId); // Set the userId state if it's in localStorage
    }
    if (storedUsername) {
      setUsername(storedUsername);
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
        localStorage.setItem("username", username);
        const userId = data.user_id; // Extract user_id from the response
        console.log("userid", data.user_id)
        setAuthToken(authToken);
        setIsLoggedIn(true);
        setError(null);
        localStorage.setItem("userId", userId); // Save user_id to localStorage
        setUserId(userId); // Update the userId state

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
    localStorage.removeItem('userId'); // Remove the userId from localStorage
    localStorage.removeItem("username");
    setAuthToken(null);
    setIsLoggedIn(false);
    setUserId(null); // Reset the userId state
  };

  return {
    isLoggedIn,
    authToken,
    loginUser,
    logoutUser,
    error,
    username,
    userId, // Include the userId here
  };
};

export default useAuth;
