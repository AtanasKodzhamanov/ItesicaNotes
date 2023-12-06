import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import LastEdited from './LastEditedPage'
import FullTreePage from './FullTreePage'

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<HomePage/>}
    />
    <Route
      path="/last-edited"
      element={<LastEdited />}
    />
    <Route
      path="/full-tree"
      element={<FullTreePage />}
    />
  </Routes>
)

export default AppRoutes
