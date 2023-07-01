import { useState, useEffect } from 'react'
import Node from './Notes/Node'
import ExpandableNewNodeForm from './Notes/ExpandableNewNodeForm'
import './HomePage.css'
import IndividualNode from './Notes/IndividualNode'

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
    console.log(note)
    setNoteId(note.id)
    setNoteText(note.content)
    setNoteTitle(note.title)
  }


  return (
    <>
      <ExpandableNewNodeForm onCreate={createNode} />
      <div className="notebook">
        <div className="note-tree-section">
          <IndividualNode
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
