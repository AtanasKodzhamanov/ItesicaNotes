import React, { useState } from 'react';
import './RenderNotes.css';
import useNotes from '../../hooks/useNotes'
import useAuth from '../../hooks/useAuth'

const NoteButton = ({ note, passNoteInfoHandler, selectedNodes, showChildrenOnClickHandler }) => {
    const [showButtons, setShowButtons] = useState(false);

    const { isLoggedIn, authToken } = useAuth()
    const {
        createNode,
        updateNode,
        deleteNode,
    } = useNotes(authToken, isLoggedIn)



    return (
        <div className="note-button-container">
            <h2
                className={`note-container ${selectedNodes.some(selectedNote => selectedNote.id === note.id) ? 'active' : ''}`}
                onMouseEnter={() => passNoteInfoHandler(note)}
                onClick={() => showChildrenOnClickHandler(note)}>{note.title}
            </h2>
            <div className="button-group">
                <button onClick={createNode} className="note-button" > <p>+</p></button>
                <button className="note-button"><p>-</p></button>
                <button className="note-button"><p>x</p></button>
                <button className="note-button"><p>✎</p></button>
                <button className="note-button"><p>&#128389;</p></button>
                <button className="note-button"><p>=</p></button>
            </div>
        </div >
    );
};

export default NoteButton;
