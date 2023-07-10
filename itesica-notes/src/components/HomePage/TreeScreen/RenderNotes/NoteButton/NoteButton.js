import React, { useState, useEffect } from 'react';
import '../RenderNotes.css';

const NoteButton = ({ note, passNoteInfoHandler, selectedNodes, showChildrenOnClickHandler, createChildNode, deleteNodeHandler }) => {

    const handleClick = (note) => {
        showChildrenOnClickHandler(note);
    };

    useEffect(() => {
        console.log("selectedNodes changed");
    }, [selectedNodes]);


    return (
        <div className="note-button-container">
            <h3 className="children-count">
                {note.children.length}
            </h3>
            <h2
                className={`note-container ${selectedNodes.some(node => node.id === note.id) || note.children.length == 0 ? 'active' : ''}`}
                onMouseEnter={() => passNoteInfoHandler(note)}
                onClick={() => handleClick(note)}
            >
                {note.title}
            </h2>
            <div className="button-group">
                <button onClick={() => createChildNode(note)} className="note-button new" > <p>+</p></button>
                <button onClick={() => deleteNodeHandler(note)} className="note-button delete"><p>x</p></button>
            </div>
        </div >
    );
};

export default NoteButton;
