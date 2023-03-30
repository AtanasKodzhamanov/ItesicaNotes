import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // Import RegisterForm component
import useAuth from './hooks/useAuth';
import './App.css'; // Import the CSS file
import Header from './components/Header'; // Import Header component
import LastEdited from './components/LastEdited';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  const {
    isLoggedIn,
    authToken,
    loginUser,
    registerUser, // Add registerUser function from useAuth
    logoutUser,
    error,
    userId,
  } = useAuth();
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Add a state to toggle between LoginForm and RegisterForm
  const username = localStorage.getItem("username");
  const [editedNodesHistory, setEditedNodesHistory] = useState([]);


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


  const updateParent = (parentId, childId, notes, setNotes) => {
    const parentIndex = notes.findIndex((note) => note.id === parentId);
    const childIndex = notes.findIndex((note) => note.id === childId);
    const newNotes = [...notes];
    newNotes[parentIndex].children.push(newNotes[childIndex]);
    newNotes.splice(childIndex, 1);
    setNotes(newNotes);
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
                    onDelete={deleteNode}
                    toggleChildrenVisibility={toggleChildrenVisibility}
                    onAddChild={createNode} // Pass createNode function as onAddChild prop
                    updateParent={(childId) =>
                      updateParent(parentId, childId, notes, setNotes)
                    } // Pass the updateParent function as a prop
                  />
                  {visibleNotes.includes(child.id) &&
                    renderChildren(child.children, child.id)}
                </div>
              )
            );
          })}
        </div>
      )
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
      if (parentId) {
        const parentIndex = notes.findIndex((note) => note.id === parentId);
        const newNotes = [...notes];
        newNotes[parentIndex].children.push(newNode);
        setNotes(newNotes);
      } else {
        setNotes([...notes, newNode]);
      }
    } else {
      const errorData = await response.json();
      console.error("Error creating node:", errorData);
    }
  };
    
  
  
  const updateNode = async (id, title, content) => {
    const authToken = localStorage.getItem("authToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);

    const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ title, content, user: userId }),
    });
  
    if (response.ok) {
      const updatedNode = await response.json();
      const originalNode = notes.find((note) => note.id === id);
      setEditedNodesHistory([...editedNodesHistory, originalNode]);
      setNotes(
        notes.map((node) =>
          node.id === updatedNode.id ? updatedNode : node
        )
      );
    } else {
      const errorData = await response.json(); // Get the error data
      console.error("Failed to update node:", errorData); // Print the error data
    }
  };
  
  const deleteNode = async (id) => {
    const authToken = localStorage.getItem("authToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);
  
    const deleteNodeRecursive = async (nodeId) => {
      const node = notes.find((note) => note.id === nodeId);
  
      if (node && node.children) {
        for (const childId of node.children) {
          await deleteNodeRecursive(childId);
        }
      }
  
      const response = await fetch(`http://localhost:8000/api/notes/${nodeId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({ user: userId }),
      });
  
      if (!response.ok) {
        console.error("Failed to delete node");
      }
    };
    const nodeToDelete = notes.find((note) => note.id === id);
    setEditedNodesHistory([...editedNodesHistory, nodeToDelete]);

    await deleteNodeRecursive(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  
  return (
    <div>
        {!isLoggedIn && (
          <>
            {showRegisterForm ? (
              <RegisterForm onRegister={registerUser} />
            ) : (
              <LoginForm onLogin={loginUser} />
            )}
            <button onClick={() => setShowRegisterForm(!showRegisterForm)}>
              {showRegisterForm ? 'Login' : 'Register'}
            </button>
          </>
        )}
        {error && <p>Error: {error.non_field_errors.join(', ')}</p>}
        
        {isLoggedIn && (
          <>
            <Header onLogout={logoutUser} />
            <Routes>
              <Route path="/" element={<Home
                  createNode={createNode}
                  notes={notes}
                  renderChildren={renderChildren}
                  username={username}
                  deleteNode={deleteNode}
                  toggleChildrenVisibility={toggleChildrenVisibility}
                  onUpdate={updateNode}
                  
                />} />          

              <Route path="/last-edited" element={<LastEdited editedNodes={editedNodesHistory} />} />
            </Routes>
          </>
        )}
        

    </div>
  );
};

export default App;