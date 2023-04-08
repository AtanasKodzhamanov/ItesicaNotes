import React, { useState, useEffect } from 'react';
import Node from './Node';
import ExpandableNewNodeForm from './ExpandableNewNodeForm';


const Home = ({ createNode, notes, renderChildren, deleteNode, toggleChildrenVisibility, onUpdate }) => {
    return (
      <>
        <ExpandableNewNodeForm onCreate={createNode} />
        <ul >
          {notes
            .filter((note) => note.parent === null)
            .map((note) => (
              <li  key={note.id}>
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
        <br>
        
        
        
        
        </br>
      </>
    );
  };

  export default Home;