import NewNodeForm from './NewNodeForm'
import React, { useState } from 'react'
import { useContext } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import styles from './ExpandableNewNodeForm.module.css'

const ExpandableNewNodeForm = ({ currentNotebookID }) => {

  const {
    createNode,
  } = useContext(NoteContext)


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
      <div className={styles.circlePlus} onClick={handleClick}>
        <span className="material-symbols-outlined">add</span>
      </div>
      {isExpanded && (
        <div className={styles.modal} onKeyDown={e => e.key === 'Escape' && closeModal()}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
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
