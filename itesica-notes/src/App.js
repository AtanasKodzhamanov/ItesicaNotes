import React from 'react'
import useAuth from './hooks/useAuth'
import './App.css'
import Header from './components/UI/Header'
import WelcomePage from './components/WelcomePage'
import useNotes from './hooks/useNotes'
import AppRoutes from './components/AppRoutes'
import { NoteProvider } from './NoteContext'


const App = () => {
  const {
    isLoggedIn,
    authToken,
    username,
    loginUser,
    logoutUser,
  } = useAuth()

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
          <NoteProvider authToken={authToken} isLoggedIn={isLoggedIn}>
            <div className="main-body">
              <AppRoutes />
            </div>
          </NoteProvider>
        </>
      )}
    </div>
  )
}

export default App
