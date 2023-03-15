import React from "react";

const Node = ({ id, title, text, children, toggleChildrenVisibility }) => {
  const handleClick = () => {
    toggleChildrenVisibility(id);
    console.log(`Node ${id} clicked!`);
    console.log(`children ${children} clicked!`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Node;
