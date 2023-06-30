import { useState, useEffect } from 'react'

// useAuth hook deals with logging in and logging out
// it uses local storage to store the authentication token, username and user id

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)

  // Check if there is an authentication token in local storage, also check for id and username
  // If they exist set the state accordingly
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUserId = localStorage.getItem('userId')
    const storedUsername = localStorage.getItem('username')

    if (storedToken) {
      setAuthToken(storedToken)
      setIsLoggedIn(true)
    }
    if (storedUserId) {
      setUserId(storedUserId)
    }
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api-token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const authToken = data.token
        const userId = data.user_id

        localStorage.setItem('authToken', authToken)
        localStorage.setItem('username', username)
        localStorage.setItem('userId', userId)

        setAuthToken(authToken)
        setIsLoggedIn(true)
        setError(null)
        setUserId(userId)
      } else {
        const errorData = await response.json()
        setError(errorData)
      }
    } catch (error) {
      setError({ non_field_errors: ['An error occurred while logging in.'] })
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    setAuthToken(null)
    setIsLoggedIn(false)
    setUserId(null)
  }

  return {
    isLoggedIn,
    authToken,
    username,
    userId,
    loginUser,
    logoutUser,
  }
}

export default useAuth
