import React, { useState } from "react";
import NodeForm from "./NodeForm";

const Node = ({ title, text, children = [], index, onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFormSubmit = (title, text) => {
    const parentIndex = index;
    console.log("onSubmit: ", onSubmit);
    onSubmit(title, text, parentIndex);
  };

  console.log("onSubmit in Node: ", onSubmit);

  return (
    <div>
      <div onClick={handleExpandClick}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <button onClick={handleExpandClick}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>
      {isExpanded && (
        <div>
          {children.map((child, childIndex) => (
            <div key={childIndex}>
              <Node
                title={child.title}
                text={child.text}
                children={child.children}
                index={childIndex}
                onSubmit={onSubmit}
              />
            </div>
          ))}
          <NodeForm onSubmit={handleFormSubmit} parentIndex={index} />
        </div>
      )}
    </div>
  );
};

export default Node;
