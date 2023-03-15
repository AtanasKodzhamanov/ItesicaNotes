import React from 'react';

const Node = ({ id, title, text, children }) => {
  const renderChildren = (children) => {
    return children.map((child) => (
      <Node
        key={child.id}
        id={child.id}
        title={child.title}
        text={child.content}
        children={child.children}
      />
    ));
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      {children && children.length > 0 && (
        <ul>
          {renderChildren(children)}
        </ul>
      )}
    </div>
  );
};

export default Node;
