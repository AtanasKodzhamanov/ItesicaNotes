// App.js
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import LoginForm from './components/LoginForm';
import useAuth from './hooks/useAuth';

const App = () => {
  const {
    isLoggedIn,
    authToken,
    loginUser,
    logoutUser,
    error,
  } = useAuth();
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn, authToken]);

  const toggleChildrenVisibility = (id) => {
    if (visibleNotes.includes(id)) {
      setVisibleNotes(visibleNotes.filter((noteId) => noteId !== id));
    } else {
      setVisibleNotes([...visibleNotes, id]);
    }
  };
  console.log(notes)
  const renderChildren = (children, parentId) => {
    return (
      children &&
      visibleNotes.includes(parentId) &&
      children.map((childId) => {
        const child = notes.find((note) => note.id === childId);
  
        return (
          child && (
            <li key={child.id}>
              <p>This should print ID: {child.id} {child.content}</p>
              <Node
                id={child.id}
                title={child.title}
                text={child.content}
                children={child.children}
                toggleChildrenVisibility={toggleChildrenVisibility}
              />
              {renderChildren(child.children, child.id)}
            </li>
          )
        );
      })
    );
  };
  
  

  return (
    <div>
      <LoginForm onLogin={loginUser} />
      {error && <p>Error: {error.non_field_errors.join(', ')}</p>}
      {isLoggedIn && (
        <>
          <button onClick={logoutUser}>Logout</button>
          <h1>My Notes</h1>
          <ul>
            {notes
              .filter((note) => note.parent === null)
              .map((note) => (
                <li key={note.id}>
                  <Node
                    id={note.id}
                    title={note.title}
                    text={note.content}
                    children={note.children}
                    toggleChildrenVisibility={toggleChildrenVisibility}
                  />
                  {renderChildren(note.children, note.id)}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
