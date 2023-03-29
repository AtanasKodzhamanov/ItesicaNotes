import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Itesica Notes</h1>
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
    </header>
  );
};

export default Header;
