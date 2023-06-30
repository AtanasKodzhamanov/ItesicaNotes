import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import LastEdited from './LastEditedPage'
import Workspace from './WorkspacePage'

const AppRoutes = ({
  createNode,
  notes,
  renderChildren,
  username,
  deleteNode,
  toggleChildrenVisibility,
  onUpdate,
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
          renderChildren={renderChildren}
          username={username}
          deleteNode={deleteNode}
          toggleChildrenVisibility={toggleChildrenVisibility}
          onUpdate={onUpdate}
          toggleMarked={toggleMarked}
        />
      }
    />
    <Route
      path="/last-edited"
      element={<LastEdited editedNodes={editedNodesHistory} />}
    />
    <Route
      path="/workspace"
      element={
        <Workspace
          createNode={createNode}
          notes={notes}
          renderChildren={renderChildren}
          username={username}
          deleteNode={deleteNode}
          toggleChildrenVisibility={toggleChildrenVisibility}
          onUpdate={onUpdate}
          toggleMarked={toggleMarked}
        />
      }
    />
  </Routes>
)

export default AppRoutes
