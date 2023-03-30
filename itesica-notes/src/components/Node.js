import React, { useState } from "react";

const Node = ({
  id,
  title,
  text,
  children,
  toggleChildrenVisibility,
  onAddChild,
  onDelete,
  onUpdate,
}) => {
  const [addingChild, setAddingChild] = useState(false);
  const [childTitle, setChildTitle] = useState("");
  const [childContent, setChildContent] = useState("");
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(text);

  const handleAddChild = () => {
    onAddChild(childTitle, childContent, id);
    setChildTitle("");
    setChildContent("");
    setAddingChild(false);
  };

  const handleUpdate = () => {
    onUpdate(id, newTitle, newContent);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="node">
      {!editing && (
        <>         
         <div onClick={() => toggleChildrenVisibility(id)} className="node-header">
        <div className="node-content">
          <p><b>{title}</b></p>
          <p>{text}</p>
        </div>
        <div className="node-buttons">
          <button onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit"}
          </button>
          <button onClick={() => setAddingChild(!addingChild)}>
            {addingChild ? "Cancel" : "Add Child"}
          </button>
        </div>
      </div>
        </>
      )}
      {editing && (
        <>
          <label htmlFor={`newTitle${id}`}>New Title:</label>
          <input
            type="text"
            id={`newTitle${id}`}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label htmlFor={`newContent${id}`}>New Content:</label>
          <textarea
            id={`newContent${id}`}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}


      {addingChild && (
        <div className="node-add-child">
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
