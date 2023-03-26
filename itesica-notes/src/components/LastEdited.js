import React from 'react';

const LastEdited = ({ editedNodes }) => {
  return (
    <div>
      <h2>Last Edited</h2>
      <ul>
        {editedNodes.slice(-5).map((node) => (
          <li key={node.id}>
            <h3>{node.title}</h3>
            <p>{node.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastEdited;
