import React, { useState, useEffect } from 'react';
import Node from './Node';
import ExpandableNewNodeForm from './ExpandableNewNodeForm';


const Home = ({ createNode, notes, renderChildren, username, deleteNode, toggleChildrenVisibility, onUpdate }) => {
    return (
      <>
        <h1>Hi, {username}!</h1>
        <ExpandableNewNodeForm onCreate={createNode} />
        <ul>
          {notes
            .filter((note) => note.parent === null)
            .map((note) => (
              <li key={note.id}>
                <Node
                  id={note.id}
                  title={note.title}
                  text={note.content}
                  children={note.children}
                  onDelete={deleteNode}
                  toggleChildrenVisibility={toggleChildrenVisibility}
                  onAddChild={(title, content) => createNode(title, content, note.id)}
                  onUpdate={onUpdate} // pass onUpdate as prop

                />
                {renderChildren(note.children, note.id)}
              </li>
            ))}
        </ul>
      </>
    );
  };

  export default Home;