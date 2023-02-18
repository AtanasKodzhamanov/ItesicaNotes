import React, { useState } from "react";

const NodeForm = ({ onSubmit, parentIndex }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title, text, parentIndex); // pass parentIndex to onSubmit function
    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <label htmlFor="text">Text:</label>
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <br />
      <button type="submit">Create Node</button>
    </form>
  );
};

export default NodeForm;
