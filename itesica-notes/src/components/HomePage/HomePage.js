import { useState, useEffect } from 'react'
import ExpandableNewNodeForm from './NewParentNode/ExpandableNewNodeForm'
import './HomePage.css'
import RenderNotes from './RenderNotes/RenderNotes'
import { NoteContext } from '../../NoteContext'
import { useContext } from 'react'
import RenderNotebooks from './RenderNotebooks/RenderNotebooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const HomePage = () => {

  const {
    createNode,
    updateNode,
    deleteNode,
    notes,
    toggleMarked
  } = useContext(NoteContext)

  useEffect(() => {
    console.log("Notes changed: ", notes)
  }, [notes])

  const [noteId, setNoteId] = useState(null)
  const [noteText, setNoteText] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [parentNode, setParentNode] = useState(null)
  const [borderEffectTitle, setBorderEffectTitle] = useState(false);
  const [borderEffectText, setBorderEffectText] = useState(false);
  const [originalNoteText, setOriginalNoteText] = useState("")
  const [originalNoteTitle, setOriginalNoteTitle] = useState("")

  // used to pass content between note text area and note tree
  const [newChildNodeForm, setNewChildNodeForm] = useState(false)
  const [childText, setChildText] = useState("")
  const [childTitle, setChildTitle] = useState("")

  const [currentNotebookID, setCurrentNotebookID] = useState(null)
  const [notebookTitle, setNotebookTitle] = useState("")


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
    console.log(parentId)

  }

  const deleteNodeHandler = (note) => {
    const confirmation = window.confirm(`WARNING: This will delete all nested children nodes as well. Are you sure you want to delete this note: ${noteTitle}`);

    console.log("passed note title: ", note.title);
    console.log("passed note", note);
    console.log("old state:", notes)

    if (confirmation) {
      console.log(note.id);
      deleteNode(note.id);
      console.log("New state:", notes)
    }
  };


  // when a user clicks on the save button, the new child node is created
  const saveChildNodeHandler = async (e) => {
    if (childTitle.trim() !== "" && childText.trim() !== "") {
      e.preventDefault();
      setNewChildNodeForm(false)
      createNode(childTitle, childText, parentNode.id);
      setChildText("")
      setChildTitle("")
    }
  }

  // when a user clicks on the cancle button, the new child node form is closed
  const cancleChildNodeHandler = () => {
    setNewChildNodeForm(false)
  }

  // when a user types in a note text area and then clicks outside of the text area, the note is automatically updated
  const handleBlur = () => {
    if (noteTitle === "" || noteText === "") {
      alert('Note title or text can\'t be missing.');
    } else {
      if (noteText !== originalNoteText) {
        setOriginalNoteText(noteText);
        setBorderEffectText(true);
        setTimeout(() => setBorderEffectText(false), 750);
      }

      if (noteTitle !== originalNoteTitle) {
        setOriginalNoteTitle(noteTitle);
        setBorderEffectTitle(true);
        setTimeout(() => setBorderEffectTitle(false), 750);
      }

      if (noteTitle !== originalNoteText || noteText !== originalNoteText) {
        updateNode(noteId, noteTitle, noteText);
      }
    }
  };

  const openNoteBookHandler = (title) => {
    setCurrentNotebookID(title)
    console.log(title)
  }

  const [animationParent] = useAutoAnimate()

  const updateNotebookID = () => {
    setCurrentNotebookID(null)
  }
  return (
    <>
      <div className="notebooks" >
        <div className="notebooks-only" ref={animationParent}>
          <RenderNotebooks
            notes={notes}
            openNoteBookHandler={openNoteBookHandler}
            deleteNodeHandler={deleteNodeHandler}
            updateNotebookID={updateNotebookID}
          />
        </div>
        <button
          className="new-notebook-button"
        >
          <ExpandableNewNodeForm
            onCreate={createNode}
            currentNotebookID={currentNotebookID} />
        </button>


      </div >
      <div className="notebook-opened">

        <div className="note-tree-section">
          {currentNotebookID != null ?
            <>
              <ExpandableNewNodeForm
                onCreate={createNode}
                currentNotebookID={currentNotebookID} />

              <RenderNotes
                notes={notes}
                currentNotebookID={currentNotebookID}
                passNoteInfoHandler={passNoteInfoHandler}
                createChildNode={createChildNode}
                deleteNodeHandler={deleteNodeHandler}
              /></>
            : "Open or create a notebook to get started!"}

        </div>
        <div className="note-text-area">
          {
            newChildNodeForm ?
              <>
                <div className='note-text-area'>
                  <textarea
                    className="note-title-input"
                    placeholder="Enter title..."
                    value={childTitle}
                    onChange={e => setChildTitle(e.target.value)}
                  />
                  <textarea
                    className="note-text-input"
                    placeholder="Enter note..."
                    value={childText}
                    onChange={e => setChildText(e.target.value)}
                  />
                  <div className="utility-buttons">
                    <button className="save-button" onClick={saveChildNodeHandler}>Save</button>
                    <button className="cancle-button" onClick={cancleChildNodeHandler}>X</button>
                  </div>
                </div>
              </>
              :
              <>
                <div className={`note-text-area`}>

                  <textarea
                    className={`note-title-input ${borderEffectTitle ? 'edit-border' : ''}`}
                    placeholder="Enter title..."
                    value={noteTitle}
                    onChange={e => setNoteTitle(e.target.value)}
                    onBlur={handleBlur}
                  />
                  <textarea
                    className={`note-text-input ${borderEffectText ? 'edit-border' : ''}`}
                    placeholder="Enter note..."
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    onBlur={handleBlur}
                  />
                </div>
              </>
          }
        </div>

      </div>

    </>
  )
}

export default HomePage
