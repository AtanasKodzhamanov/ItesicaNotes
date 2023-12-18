import React, { useState } from 'react'
import LoginForm from './Auth/LoginForm'
import RegisterForm from './Auth/RegisterForm'
import styles from './WelcomePage.module.css'


const WelcomePage = ({ loginUser }) => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const handleLoginClick = () => {
    setShowLoginForm(true)
    setShowRegisterForm(false)
  }

  const handleRegisterClick = () => {
    setShowRegisterForm(true)
    setShowLoginForm(false)
  }

  return (
    <>
        <h1 className={styles.welcomeTitle}> ITESICA NOTES</h1>
        <h2 className={styles.welcomeSubTitle}>Instant and Easy Access to Your Thoughts</h2>
        {showLoginForm && <LoginForm onLogin={loginUser} />}
        {showRegisterForm && <RegisterForm />}

      <div className={styles.buttons}>
        {showLoginForm ? (
          <div className={styles.regOrLog} onClick={handleRegisterClick}>Don't have an account? <b>Register</b></div>
        ) : null}
        {showRegisterForm ? (
          <div className={styles.regOrLog} onClick={handleLoginClick}>Already have an account? <b>Login</b></div>
        ) : null}
        {!showLoginForm && !showRegisterForm ? (
          <div className={styles.buttons}>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default WelcomePage
