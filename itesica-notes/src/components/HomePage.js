import { useState, useEffect } from 'react'
import ExpandableNewNodeForm from './Notes/ExpandableNewNodeForm'
import './HomePage.css'
import RenderNotes from './Notes/RenderNotes'

const HomePage = ({
  createNode,
  notes,
  renderChildren,
  deleteNode,
  toggleChildrenVisibility,
  toggleMarked,
  onUpdate,
}) => {

  const [noteId, setNoteId] = useState(null)
  const [noteText, setNoteText] = useState(null)
  const [noteTitle, setNoteTitle] = useState(null)

  const passNoteInfoHandler = (note) => {
    setNoteId(note.id)
    setNoteText(note.content)
    setNoteTitle(note.title)
  }


  return (
    <>
      <ExpandableNewNodeForm onCreate={createNode} />
      <div className="notebook">
        <div className="note-tree-section">
          <RenderNotes
            notes={notes}
            passNoteInfoHandler={passNoteInfoHandler}
          />
        </div>
        <div className="note-text-area">
          <textarea
            className="note-text"
            value={noteTitle + '\n' + '\n' + noteText}
          >
          </textarea>
        </div>
      </div>

    </>
  )
}

export default HomePage
