import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({ onLogout, isLoggedIn }) => {

  return (
    <header className={styles.header}>
      {!isLoggedIn && (
        <>
          <div className={styles.headerTitle}>
            <h1 className={styles.capitalize}> Itesica notes</h1>
          </div>
        </>
      )}

      {isLoggedIn && (
        <>
          <div className={styles.headerTitle}>
          </div>
          <div className={styles.headerLinks}>
            <Link to="/">NOTES</Link>
            <Link to="/last-edited">LAST EDITED</Link>
            <Link to="/workspace">WORKSPACE</Link>
            <Link to="/full-tree">FULL TREE</Link>
          </div>
          <div>
            <button className={styles.logoutButton} onClick={onLogout}>
              LOGOUT
            </button>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
