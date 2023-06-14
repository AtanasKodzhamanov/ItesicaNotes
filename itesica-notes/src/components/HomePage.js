import React from 'react'
import Node from './Notes/Node'
import ExpandableNewNodeForm from './Notes/ExpandableNewNodeForm'

const Home = ({
  createNode,
  notes,
  renderChildren,
  deleteNode,
  toggleChildrenVisibility,
  toggleMarked,
  onUpdate,
}) => {
  return (
    <>
      <ExpandableNewNodeForm onCreate={createNode} />
      <ul>
        {notes
          .filter((note) => note.parent === null)
          .map((note) => (
            <li key={note.id}>
              {console.log('Mark' + note.marked)}
              <Node
                id={note.id}
                title={note.title}
                text={note.content}
                children={note.children}
                onDelete={deleteNode}
                marked={note.marked}
                toggleChildrenVisibility={toggleChildrenVisibility}
                onAddChild={(title, content) =>
                  createNode(title, content, note.id)
                }
                onUpdate={onUpdate}
                toggleMarked={(id, marked) => toggleMarked(id, note.marked)}
              />
              {renderChildren(note.children, note.id)}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Home
