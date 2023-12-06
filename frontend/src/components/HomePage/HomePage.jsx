import { useState, useEffect } from 'react'
import { NoteContext } from '../../context/NoteContext'
import { useContext } from 'react'
import NoteBooksBar from './NotebooksBar/NoteBooksBar'
import TreeScreen from './TreeScreen/TreeScreen'
import NoteTextArea from './NoteTextArea/NoteTextArea'
import styles from './HomePage.module.css'

const HomePage = () => {

  const {
    deleteNode,
    toggleMarked
  } = useContext(NoteContext)

  // used to pass content between note text area and note tree
  const [newChildNodeForm, setNewChildNodeForm] = useState(false)
  const [parentNode, setParentNode] = useState(null)
  const [currentNotebookID, setCurrentNotebookID] = useState(null)
  const [selectedNote, setSelectedNote] = useState({})

  // when a user hovers on a note inside the note tree, the note is selected and passed up to HomePage.js which then passes it down to NoteTextArea.js
  const passNoteInfoHandler = (note) => {
    setSelectedNote(note)
  }


  const createChildNode = (parentId) => {
    setParentNode(parentId)
    setNewChildNodeForm(true)
  }

  // when a user clicks on the delete button, or drags and drops a notebook to the bin, the node and its children are deleted. This function is passed down to NoteBooksBar.js and TreeScreen.js
  const deleteNodeHandler = (note) => {
    const confirmation = window.confirm(`WARNING: This will delete all nested children nodes as well. Are you sure you want to delete this note: ${note.title}`);
    if (confirmation) {
      deleteNode(note.id);
    }
  };

  // used to open a notebook when a user clicks on it, which allows TreeScreen.js to filter and render the correct notes
  const openNoteBookHandler = (title) => {
    setCurrentNotebookID(title)
  }

  // when there is no notebook open, or none exist, a default screen is rendered
  // if a notebook is open and a new note at a root level is created, it uses the currentNotebookID to set the note's parent id
  const updateNotebookID = () => {
    setCurrentNotebookID(null)
  }

  // NotebooksBar holds the list of notebooks
  // TreeScreen renders the notes inside the selected notebook
  // NoteTextArea is used to for quick editing and creating of notes
  return (
    <>
      <div className={styles.notebooks}>
        <NoteBooksBar
          openNoteBookHandler={openNoteBookHandler}
          updateNotebookID={updateNotebookID}
          deleteNodeHandler={deleteNodeHandler}
          currentNotebookID={currentNotebookID}
        />
      </div>
      <div className={styles.notebookOpened}>
        <div className={styles.noteTreeSection}>
          <TreeScreen
            currentNotebookID={currentNotebookID}
            passNoteInfoHandler={passNoteInfoHandler}
            createChildNode={createChildNode}
            deleteNodeHandler={deleteNodeHandler}
          />
        </div>
        <div className={styles.noteTextArea}>
          <NoteTextArea
            parentNode={parentNode}
            selectedNote={selectedNote}
            setNewChildNodeForm={setNewChildNodeForm}
            newChildNodeForm={newChildNodeForm}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage
