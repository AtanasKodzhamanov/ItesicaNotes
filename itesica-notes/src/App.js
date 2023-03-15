import React, { useState, useEffect } from "react";
import Node from "./components/Node";
import LoginForm from './components/LoginForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      const authToken = data.token;
      localStorage.setItem("authToken", authToken);
      setIsLoggedIn(true);
    } else {
      // Handle login error
    }
  };

  

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const authToken = localStorage.getItem("authToken");
      fetch("http://localhost:8000/api/notes/", {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);
  

  const renderChildren = (children) => {
    if (!children) {
      return null;
    }

    return children.map((child) => (
      <Node
        key={child.id}
        id={child.id}
        title={child.title}
        text={child.content}
        children={child.children}
      />
    ));
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setNotes([]);
  };

  return (
    <div>
      <LoginForm onLogin={loginUser} />
      {isLoggedIn && <button onClick={logoutUser}>Logout</button>}
    {isLoggedIn ? (
        <>
          <h1>My Notes</h1>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <Node
                  id={note.id}
                  title={note.title}
                  text={note.content}
                  children={note.children}
                />
                {renderChildren(note.children)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to view your notes.</p>
      )}
    </div>
  );
};

export default App;
