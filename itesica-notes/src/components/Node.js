import React, { useState } from "react";
import NewNodeForm from "./NewNodeForm";

const Node = ({
  id,
  title,
  text,
  marked,
  children,
  toggleChildrenVisibility,
  toggleMarked,
  onAddChild,
  onDelete,
  onUpdate,
  updateParent, // add updateParent as a prop
}) => {
  const [addingChild, setAddingChild] = useState(false);
  const [childTitle, setChildTitle] = useState("");
  const [childContent, setChildContent] = useState("");
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(text);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const closeModal = () => {
    setIsExpanded(false);
    setAddingChild(false);
    setEditing(false);
  };

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

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.setData('application/node', e.target.outerHTML);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function handleDrop(e) {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(draggedItemId);

    // Find the closest parent with the class 'container'
    let currentContainer = e.target;
    while (currentContainer && !currentContainer.classList.contains("container")) {
      currentContainer = currentContainer.parentElement;
    }

    if (currentContainer) {
      const newParentId = parseInt(currentContainer.dataset.id, 10);
      const draggedItemId = parseInt(draggedItem.dataset.id, 10);
      updateParent(newParentId, draggedItemId); // call updateParent
      currentContainer.appendChild(draggedItem);
    }
  }

  return (
    <div className="container">
      <div
        className="node item"
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!editing && (
          <>
            <div onClick={() => toggleChildrenVisibility(id)} className="node-header">
              <div className="node-content">
                <p>
                  <b>{title}</b>
                </p>
                <p>{text}</p>
              </div>
              <div className="node-buttons">
                <button onClick={() => {
                  setEditing(!editing)
                  setIsExpanded(!isExpanded);
                }}>
                  {editing ? "Cancel" : "Edit"}
                </button>
                <button onClick={() => toggleMarked(id, marked)}>
                  {marked ? "Unmark" : "Mark"}
                </button>
                <button onClick={() => setAddingChild(!addingChild)}>
                  {addingChild ? "Cancel" : "New"}
                </button>
              </div>
            </div>
          </>
        )}
        {editing && (
          <>
            <div className="modal">

              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <br></br>
                <label >New Title:</label>
                <input
                  type="text"
                  id={`newTitle${id}`}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <label>New Content:</label>
                <textarea
                  id={`newContent${id}`}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <button onClick={handleUpdate}>Save Changes</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </>

        )}

        {addingChild && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <br></br>
              <label>Child Title:</label>
              <input
                type="text"
                id={`childTitle${id}`}
                value={childTitle}
                onChange={(e) => setChildTitle(e.target.value)}
              />
              <label>Child Content:</label>
              <textarea
                id={`childContent${id}`}
                value={childContent}
                onChange={(e) => setChildContent(e.target.value)}
              />
              <button onClick={handleAddChild}>Create Child</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Node;
