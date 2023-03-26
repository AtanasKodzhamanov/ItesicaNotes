import NewNodeForm from './NewNodeForm';import React, { useState } from 'react';

const ExpandableNewNodeForm = ({ onCreate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormCreate = (title, content, e) => {
    e.stopPropagation();
    onCreate(title, content);
  };

  const handleMouseEnter = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className={`formContainer ${isExpanded ? 'expanded' : ''}`}>
      <div
        className="formContainerTitle"
        onMouseEnter={handleMouseEnter}
      >
        Add new parent
      </div>
      <NewNodeForm onCreate={handleFormCreate} />
    </div>
  );
};

  
export default ExpandableNewNodeForm;
