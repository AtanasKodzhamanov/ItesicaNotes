import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import LastEdited from './LastEditedPage'

const AppRoutes = ({
  createNode,
  notes,
  deleteNode,
  updateNode,
  toggleMarked,
  editedNodesHistory,
}) => (
  <Routes>
    <Route
      path="/"
      element={
        <HomePage
          createNode={createNode}
          notes={notes}
          deleteNode={deleteNode}
          updateNode={updateNode}
          toggleMarked={toggleMarked}
        />
      }
    />
    <Route
      path="/last-edited"
      element={<LastEdited editedNodes={editedNodesHistory} />}
    />
  </Routes>
)

export default AppRoutes
