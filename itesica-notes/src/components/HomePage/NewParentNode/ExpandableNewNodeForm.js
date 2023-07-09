import NewNodeForm from './NewNodeForm'
import React, { useState } from 'react'
import './ExpandableNewNodeForm.css'

const ExpandableNewNodeForm = ({ onCreate, currentNotebookID }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFormCreate = (title, content, e, currentNotebookID) => {
    e.stopPropagation()
    onCreate(title, content, currentNotebookID)
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
            <NewNodeForm onCreate={handleFormCreate} currentNotebookID={currentNotebookID} />
          </div>
        </div>
      )}
    </>
  )
}

export default ExpandableNewNodeForm
