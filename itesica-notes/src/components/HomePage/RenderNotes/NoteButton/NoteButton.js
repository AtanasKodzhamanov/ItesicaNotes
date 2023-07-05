import React, { useState } from 'react';
import '../RenderNotes.css';
import useNotes from '../../../../hooks/useNotes'
import useAuth from '../../../../hooks/useAuth'

const NoteButton = ({ note, passNoteInfoHandler, selectedNodes, showChildrenOnClickHandler, createChildNode, deleteNodeHandler }) => {
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
                <button onClick={() => createChildNode(note)} className="note-button new" > <p>+</p></button>
                <button onClick={() => deleteNodeHandler(note)} className="note-button delete"><p>x</p></button>
            </div>
        </div >
    );
};

export default NoteButton;
