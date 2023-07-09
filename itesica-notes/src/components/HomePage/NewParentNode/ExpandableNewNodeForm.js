import NewNodeForm from './NewNodeForm'
import React, { useState } from 'react'
import './ExpandableNewNodeForm.css'

const ExpandableNewNodeForm = ({ createNode, currentNotebookID }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFormCreate = (title, content, e, currentNotebookID) => {
    e.stopPropagation()
    createNode(title, content, currentNotebookID)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const closeModal = () => {
    setIsExpanded(false)
  }

  return (
    <>
      <div className="circle-plus" onClick={handleClick}>
        <h1>+</h1>
      </div>
      {isExpanded && (
        <div className="modal" onKeyDown={e => e.key === 'Escape' && closeModal()}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <NewNodeForm createNode={handleFormCreate} currentNotebookID={currentNotebookID} />
          </div>
        </div>
      )}
    </>
  )
}

export default ExpandableNewNodeForm
