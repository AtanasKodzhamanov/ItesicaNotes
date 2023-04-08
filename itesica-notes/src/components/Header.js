import React from 'react';
import { Link } from 'react-router-dom';



const Header = ({ onLogout, username }) => {

  function appendPossessive(username) {
    return username.endsWith('s') ? username + "'" : username + "'s";
  }

  return (
    <header className="header">
      <div className="header-title">
        <h1 className="capitalize">{appendPossessive(username)} notes</h1>
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
