import React, { useState } from 'react';
import './IndividualNode.css';

const IndividualNode = ({ notes, passNoteInfoHandler }) => {
    const [selectedNodes, setSelectedNodes] = useState([]);

    const showChildrenOnClickHandler = (note) => {
        setSelectedNodes([...selectedNodes, note]);
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
                        <div className="note-body" key={note.id} onMouseEnter={() => passNoteInfoOnHoverHandler(note)}>
                            <h2 className="note-container" onClick={() => showChildrenOnClickHandler(note)}>{note.title}</h2>
                            {selectedNodes.includes(note) && renderNotes(note.id)}
                        </div>
                    ))
                }
            </div>
        );
    };

    return renderNotes();
};

export default IndividualNode;
