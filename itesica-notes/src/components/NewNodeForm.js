import React, { useState } from "react";

const NewNodeForm = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate(title, content, e);
      setTitle("");
      setContent("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Node</button>
      </form>
    );
  };

export default NewNodeForm;