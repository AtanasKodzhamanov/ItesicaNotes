import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
    <div className="header-title">
        <h1>Itesica Notes</h1>
      </div>
      <div className="header-links">
        <a href="#last-edited">Last edited</a>
        <a href="#workspace">Workspace</a>
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