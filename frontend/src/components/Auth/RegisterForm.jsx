import React, { useState } from 'react'
import useRegister from '../../hooks/useRegister'
import styles from './Form.module.css'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, success, registerUser } = useRegister()

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser(username, password)
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <h2>CREATE NEW ACCOUNT</h2>
        <label htmlFor="username">USERNAME:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">PASSWORD:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.buttonOrder} type="submit" disabled={loading}>
          <span className="material-symbols-outlined">person</span>
          REGISTER
        </button>
      </form>
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {success && <p>Registration successful! You can now log in.</p>}
    </div>
  )
}

export default RegisterForm
