import React from 'react';
import useAuth from './hooks/useAuth'
import './App.css'
import Header from './components/UI/Header'
import WelcomePage from './components/WelcomePage'
import AppRoutes from './components/AppRoutes'
import { NoteProvider } from './context/NoteContext'


const App = () => {
  const {
    isLoggedIn,
    authToken,
    username,
    loginUser,
    logoutUser,
  } = useAuth()


  return (
    <div className={"page-body"}>

      {!isLoggedIn && (
        <>
          <WelcomePage loginUser={loginUser} />
        </>
        
      )}

      {isLoggedIn && (
        <>
            <NoteProvider authToken={authToken} isLoggedIn={isLoggedIn}>
              <div className="main-body">
                  <Header
                  onLogout={logoutUser}
                  username={username}
                  isLoggedIn={isLoggedIn}
                />
                <AppRoutes/>
              </div>
            </NoteProvider>
        </>
      )}
    </div>
  )
}

export default App
