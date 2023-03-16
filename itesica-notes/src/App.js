// App.js
import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import LoginForm from './components/LoginForm';
import useAuth from './hooks/useAuth';
import "./App.css"; // Import the CSS file

const App = () => {
  const {
    isLoggedIn,
    authToken,
    loginUser,
    logoutUser,
    error,
    userId,
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

  const renderChildren = (children, parentId) => {
    return (
      children &&
      visibleNotes.includes(parentId) && (
        <div className="children-container">
          {children.map((childId) => {
            const child = notes.find((note) => note.id === childId);
  
            return (
              child && (
                <div key={child.id} className="child-wrapper">
                  <Node
                    id={child.id}
                    title={child.title}
                    text={child.content}
                    children={child.children}
                    toggleChildrenVisibility={toggleChildrenVisibility}
                    onAddChild={createNode} // Pass createNode function as onAddChild prop
                  />
                  {visibleNotes.includes(child.id) && renderChildren(child.children, child.id)}
                </div>
              )
            );
          })}
        </div>
      )
    );
  };

  const NewNodeForm = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate(title, content);
      setTitle("");
      setContent("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Node</button>
      </form>
    );
  };

  const createNode = async (title, content, parentId = null) => {
    const authToken = localStorage.getItem("authToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
  
    const response = await fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ title, content, user: userId, parent: parentId }),
    });
  
    if (response.ok) {
      const newNode = await response.json();
      setNotes([...notes, newNode]);
  
      if (parentId) {
        setVisibleNotes([...visibleNotes, parentId]);
      }
    } else {
      const errorData = await response.json();
      console.error("Error creating node:", errorData);
    }
  };
  
  
  

  return (
    <div>
    <LoginForm onLogin={loginUser} />
    {error && <p>Error: {error.non_field_errors.join(', ')}</p>}
    <NewNodeForm onCreate={(title, content) => createNode(title, content)} />
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
                onAddChild={(title, content) => createNode(title, content, note.id)}
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

