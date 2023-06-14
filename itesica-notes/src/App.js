import React from 'react'
import Node from './components/Notes/Node'
import useAuth from './hooks/useAuth'
import './App.css'
import Header from './components/UI/Header'
import WelcomePage from './components/WelcomePage'
import useNotes from './hooks/useNotes'
import AppRoutes from './components/AppRoutes'

const App = () => {
  const {
    isLoggedIn,
    authToken,
    loginUser,
    registerUser,
    logoutUser,
    error,
    userId,
  } = useAuth()

  const username = localStorage.getItem('username')

  const {
    notes,
    visibleNotes,
    editedNodesHistory,
    toggleChildrenVisibility,
    updateParent,
    createNode,
    updateNode,
    deleteNode,
    toggleMarked,
  } = useNotes(authToken, isLoggedIn)

  const renderChildren = (children, parentId) => {
    return (
      children &&
      visibleNotes.includes(parentId) && (
        <div className="children-container">
          {children.map((childId) => {
            const child = notes.find((note) => note.id === childId)

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
                    toggleMarked={toggleMarked}
                  />
                  {visibleNotes.includes(child.id) &&
                    renderChildren(child.children, child.id)}
                </div>
              )
            )
          })}
        </div>
      )
    )
  }

  return (
    <div>
      <Header
        onLogout={logoutUser}
        username={username}
        isLoggedIn={isLoggedIn}
      />

      {!isLoggedIn && (
        <WelcomePage registerUser={registerUser} loginUser={loginUser} />
      )}

      {isLoggedIn && (
        <>
          <div className="main-body">
            <AppRoutes
              createNode={createNode}
              notes={notes}
              renderChildren={renderChildren}
              username={username}
              deleteNode={deleteNode}
              toggleChildrenVisibility={toggleChildrenVisibility}
              onUpdate={updateNode}
              toggleMarked={toggleMarked}
              editedNodesHistory={editedNodesHistory}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default App
