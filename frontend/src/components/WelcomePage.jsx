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

        {showLoginForm && <LoginForm onLogin={loginUser} />}
        {showRegisterForm && <RegisterForm />}

      <div className={styles.buttons}>
        {showLoginForm ? (
          <button onClick={handleRegisterClick}>Register</button>
        ) : null}
        {showRegisterForm ? (
          <button onClick={handleLoginClick}>Login</button>
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
