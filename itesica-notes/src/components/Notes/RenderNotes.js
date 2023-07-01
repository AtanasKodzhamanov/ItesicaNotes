import React, { useState } from 'react';
import './RenderNotes.css';

const RenderNotes = ({ notes, passNoteInfoHandler }) => {
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);

    const showChildrenOnClickHandler = (note) => {
        setSelectedNodes([...selectedNodes, note]);
        setActiveNote(true);
    };

    const passNoteInfoOnHoverHandler = (note) => {
        passNoteInfoHandler(note)
    };

    const renderNotes = (parentId = null) => {
        return (
            <div>
                {notes
                    .filter((note) => note.parent === parentId)
                    .map((note) => (
                        <div className="note-body" key={note.id} >
                            <h2
                                className={`note-container ${selectedNodes.some(selectedNote => selectedNote.id === note.id) ? 'active' : ''}`}
                                onMouseEnter={() => passNoteInfoOnHoverHandler(note)}
                                onClick={() => showChildrenOnClickHandler(note)}>{note.title}
                            </h2>
                            {selectedNodes.includes(note) && renderNotes(note.id)}
                        </div>
                    ))
                }
            </div>
        );
    };

    return renderNotes();
};

export default RenderNotes;
