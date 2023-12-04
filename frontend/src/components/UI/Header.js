import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ onLogout, isLoggedIn }) => {

  return (
    <header className="header">
      {!isLoggedIn && (
        <>
          <div className="header-title">
            <h1 className="capitalize"> Itesica notes</h1>
          </div>
        </>
      )}

      {isLoggedIn && (
        <>
          <div className="header-title">
          </div>
          <div className="header-links">
            <Link to="/">Notes</Link>
            <Link to="/last-edited">Last edited</Link>
            <Link to="/workspace">Workspace</Link>
          </div>
          <div>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
