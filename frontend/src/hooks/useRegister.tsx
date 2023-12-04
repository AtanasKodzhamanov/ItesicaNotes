import { useState } from 'react'

const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const registerUser = async (username, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const errorData = await response.json()
        setError(errorData)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, registerUser }
}

export default useRegister
