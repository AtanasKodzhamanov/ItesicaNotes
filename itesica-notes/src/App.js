import React, { useState } from "react";
import Node from "./components/Node";
import NodeForm from "./components/NodeForm";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [nodes, setNodes] = useState([
    {
      id: uuidv4(),
      title: "Root Node",
      text: "This is the root node",
      children: [],
    },
  ]);

  const handleFormSubmit = (title, text, parentId) => {
    const newNodes = [...nodes];
    const newNode = {
      id: uuidv4(),
      title,
      text,
      children: [],
    };

    if (parentId === "") {
      newNodes.push(newNode);
    } else {
      const parent = newNodes.find((node) => node.id === parentId);
      if (parent) {
        parent.children.push(newNode);
      }
    }

    setNodes(newNodes);
  };

  const handleDelete = (nodeId, parent) => {
    const newNodes = [...nodes];
    if (parent === "") {
      newNodes.splice(nodeId, 1);
    } else {
      const parentIndex = newNodes.findIndex((node) => node.id === parent);
      newNodes[parentIndex].children.splice(nodeId, 1);
    }
    setNodes(newNodes);
  };

  const handleChildFormSubmit = (title, text, parentId) => {
    handleFormSubmit(title, text, parentId);
  };

  return (
    <div>
      <NodeForm onSubmit={handleFormSubmit} />
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          title={node.title}
          text={node.text}
          children={node.children}
          onSubmit={handleFormSubmit}
          onDelete={handleDelete}
          onChildFormSubmit={handleChildFormSubmit}
        />
      ))}
    </div>
  );
};

export default App;
