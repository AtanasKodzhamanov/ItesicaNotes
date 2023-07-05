import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import LastEdited from './LastEditedPage'

const AppRoutes = ({

}) => (
  <Routes>
    <Route
      path="/"
      element={<HomePage />}
    />
    <Route
      path="/last-edited"
      element={<LastEdited />}
    />
  </Routes>
)

export default AppRoutes
