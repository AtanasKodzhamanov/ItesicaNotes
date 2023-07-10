import { useState } from 'react'
import './HomePage.css'
import { NoteContext } from '../../NoteContext'
import { useContext } from 'react'
import NoteBooksBar from './NotebooksBar/NoteBooksBar'
import TreeScreen from './TreeScreen/TreeScreen'
import NoteTextArea from './NoteTextArea/NoteTextArea'

const HomePage = () => {

  const {
    deleteNode,
    toggleMarked
  } = useContext(NoteContext)

  const [noteId, setNoteId] = useState(null)
  const [noteText, setNoteText] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [parentNode, setParentNode] = useState(null)
  const [originalNoteText, setOriginalNoteText] = useState("")
  const [originalNoteTitle, setOriginalNoteTitle] = useState("")

  // used to pass content between note text area and note tree
  const [newChildNodeForm, setNewChildNodeForm] = useState(false)
  const [childText, setChildText] = useState("")
  const [childTitle, setChildTitle] = useState("")

  const [currentNotebookID, setCurrentNotebookID] = useState(null)

  const passNoteInfoHandler = (note) => {
    setNoteId(note.id)
    setNoteText(note.content)
    setNoteTitle(note.title)
    setOriginalNoteText(note.content)
    setOriginalNoteTitle(note.title)
  }

  const createChildNode = (parentId) => {
    setParentNode(parentId)
    setNewChildNodeForm(true)
  }

  const deleteNodeHandler = (note) => {
    const confirmation = window.confirm(`WARNING: This will delete all nested children nodes as well. Are you sure you want to delete this note: ${noteTitle}`);

    if (confirmation) {
      deleteNode(note.id);
    }
  };

  const openNoteBookHandler = (title) => {
    setCurrentNotebookID(title)
  }

  const updateNotebookID = () => {
    setCurrentNotebookID(null)
  }

  return (
    <>
      <div className="notebooks">
        <NoteBooksBar
          openNoteBookHandler={openNoteBookHandler}
          updateNotebookID={updateNotebookID}
          deleteNodeHandler={deleteNodeHandler}
          currentNotebookID={currentNotebookID}
        />
      </div>
      <div className="notebook-opened">
        <div className="note-tree-section">
          <TreeScreen
            currentNotebookID={currentNotebookID}
            passNoteInfoHandler={passNoteInfoHandler}
            createChildNode={createChildNode}
            deleteNodeHandler={deleteNodeHandler}
          />
        </div>
        <div className="note-text-area">
          <NoteTextArea
            noteTitle={noteTitle}
            noteText={noteText}
            setNoteTitle={setNoteTitle}
            setNoteText={setNoteText}
            childText={childText}
            childTitle={childTitle}
            setChildTitle={setChildTitle}
            setChildText={setChildText}
            originalNoteText={originalNoteText}
            originalNoteTitle={originalNoteTitle}
            setOriginalNoteText={setOriginalNoteText}
            setOriginalNoteTitle={setOriginalNoteTitle}
            setNewChildNodeForm={setNewChildNodeForm}
            newChildNodeForm={newChildNodeForm}
            noteId={noteId}
            parentNode={parentNode}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage
