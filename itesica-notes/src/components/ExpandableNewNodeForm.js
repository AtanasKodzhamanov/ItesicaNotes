import NewNodeForm from './NewNodeForm';
import React, { useState } from 'react';
import './ExpandableNewNodeForm.css';

const ExpandableNewNodeForm = ({ onCreate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormCreate = (title, content, e) => {
    e.stopPropagation();
    onCreate(title, content);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const closeModal = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div className="circle-plus" onClick={handleClick}>
        +
      </div>
      {isExpanded && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <NewNodeForm onCreate={handleFormCreate} />
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableNewNodeForm;
