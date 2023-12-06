import React, { useState } from 'react'
import LoginForm from './Auth/LoginForm'
import RegisterForm from './Auth/RegisterForm'
import styles from './WelcomePage.module.css'


const WelcomePage = ({ loginUser }) => {
  const [showLoginForm, setShowLoginForm] = useState(false)
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
      <div className={styles.welcomePageInfo}>
        {showLoginForm || showRegisterForm ? null : (
          <div>
            <p>
              {' '}
              This note app was born out of my personal need to centralise and
              simplify the management of my notes, ideas, links, and other
              content.
            </p>

            <p>
              {' '}
              The app offers a user-friendly tree structure for organising and
              managing notes, allowing you to add, edit, delete, and create
              sub-notes to suit your needs.
            </p>
          </div>
        )}
        {showLoginForm && <LoginForm onLogin={loginUser} />}
        {showRegisterForm && <RegisterForm />}
      </div>

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
