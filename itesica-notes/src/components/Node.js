import React, { useState } from 'react';

const Node = ({
  id,
  title,
  text,
  children,
  toggleChildrenVisibility,
  onAddChild,
}) => {
  const [addingChild, setAddingChild] = useState(false);
  const [childTitle, setChildTitle] = useState('');
  const [childContent, setChildContent] = useState('');

  const handleAddChild = () => {
    onAddChild(childTitle, childContent, id);
    setChildTitle('');
    setChildContent('');
    setAddingChild(false);
  };

  return (
    <div>
      <h2 onClick={() => toggleChildrenVisibility(id)}>{title}</h2>
      <p>{text}</p>
      <button onClick={() => setAddingChild(!addingChild)}>
        {addingChild ? 'Cancel' : 'Add Child'}
      </button>
      {addingChild && (
        <div>
          <label htmlFor={`childTitle${id}`}>Child Title:</label>
          <input
            type="text"
            id={`childTitle${id}`}
            value={childTitle}
            onChange={(e) => setChildTitle(e.target.value)}
          />
          <label htmlFor={`childContent${id}`}>Child Content:</label>
          <textarea
            id={`childContent${id}`}
            value={childContent}
            onChange={(e) => setChildContent(e.target.value)}
          />
          <button onClick={handleAddChild}>Create Child</button>
        </div>
      )}
    </div>
  );
};

export default Node;
