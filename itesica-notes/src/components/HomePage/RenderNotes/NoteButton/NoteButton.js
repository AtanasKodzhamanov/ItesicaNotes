import React, { useState, useEffect } from 'react';
import '../RenderNotes.css';

const NoteButton = ({ note, passNoteInfoHandler, selectedNodes, showChildrenOnClickHandler, createChildNode, deleteNodeHandler }) => {

    const [isActive, setIsActive] = useState([]);
    const [highlighted, setHighlighted] = useState(false);

    const handleClick = (note) => {
        setIsActive(prevNotes => {
            if (prevNotes.includes(note.id)) {
                return prevNotes.filter(id => id !== note.id);
            } else {
                return [...prevNotes, note.id];
            }
        });

        showChildrenOnClickHandler(note);
    };

    useEffect(() => {
        setHighlighted(isActive.includes(note.id) || note.children.length === 0);
    }, [isActive, note.id, note.children]);


    return (
        <div className="note-button-container">
            <h3 className="children-count">
                {note.children.length}
            </h3>
            <h2
                className={`note-container ${highlighted ? 'active' : ''}`}
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
