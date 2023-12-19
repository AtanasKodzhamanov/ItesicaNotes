import React from 'react'
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import styles from './LastEditedPage.module.css'

const LastEdited = () => {
  const {notes} = useContext(NoteContext)
  let editedNodes = notes.filter((note) => note.edit_date !== null)
  editedNodes = editedNodes.slice(-10).reverse()

  return (
    <div>
      <h2>EDIT LOG</h2>
      <ul>
        {console.log(editedNodes)}
        {editedNodes
          .map((node) => {
            // Convert the edit_date string to a Date object
            const editDate = new Date(node.edit_date)
            // Format the date and time strings
            const formattedDate = editDate.toLocaleDateString('en-GB')
            const formattedTime = editDate.toLocaleTimeString('en-GB')
            // Combine the date and time strings
            const formattedDateTime = `${formattedDate} ${formattedTime}`
            return (
              <li key={node.edit_date} className={styles.editCard}>
                <div className="node">
                  <div className="node">
                    <h3>{node.title}</h3>
                  </div>
                  <div className="edit-time">
                    <p>Edited on:</p>
                    <p>{formattedDateTime}</p>
                  </div>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default LastEdited
