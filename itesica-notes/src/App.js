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
import WelcomePage from './components/WelcomePage';
import useNotes from "./hooks/useNotes";


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

  const [showRegisterForm, setShowRegisterForm] = useState(false); // Add a state to toggle between LoginForm and RegisterForm
  const username = localStorage.getItem("username");

  const {
    notes,
    visibleNotes,
    editedNodesHistory,
    toggleChildrenVisibility,
    updateParent,
    createNode,
    updateNode,
    deleteNode,
  } = useNotes(authToken, isLoggedIn);

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
                    onUpdate={updateNode}
                    toggleChildrenVisibility={toggleChildrenVisibility}
                    onAddChild={createNode} // Pass createNode function as onAddChild prop
                    updateParent={() => updateParent(parentId, child.id)}
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

  return (
    <div>
      <Header
        onLogout={logoutUser}
        username={username}
        isLoggedIn={isLoggedIn} />

      {!isLoggedIn && (
        <WelcomePage
          registerUser={registerUser}
          loginUser={loginUser}
        ></WelcomePage>
      )}

      {isLoggedIn && (
        <>
          <div className="main-body">
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
          </div>
        </>
      )}


    </div>
  );
};

export default App;