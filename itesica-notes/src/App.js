import React from 'react'
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
    username,
    loginUser,
    logoutUser,
  } = useAuth()

  const {
    notes,
    editedNodesHistory,
    toggleChildrenVisibility,
    createNode,
    updateNode,
    deleteNode,
    toggleMarked,
    renderChildren,
  } = useNotes(authToken, isLoggedIn)

  return (
    <div>
      <Header
        onLogout={logoutUser}
        username={username}
        isLoggedIn={isLoggedIn}
      />

      {!isLoggedIn && (
        <WelcomePage loginUser={loginUser} />
      )}

      {isLoggedIn && (
        <>
          <div className="main-body">
            <AppRoutes
              createNode={createNode}
              notes={notes}
              username={username}
              deleteNode={deleteNode}
              updateNode={updateNode}
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
