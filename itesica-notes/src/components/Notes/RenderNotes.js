import React, { useState } from 'react';
import './RenderNotes.css';
import NoteButton from './NoteButton';

const RenderNotes = ({ notes, passNoteInfoHandler }) => {
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const showChildrenOnClickHandler = (note) => {
        setSelectedNodes([...selectedNodes, note]);
        setActiveNote(true);
    };

    const passNoteInfoOnHoverHandler = (note) => {
        passNoteInfoHandler(note)
    };

    const handleMouseEnter = () => {
        setShowButtons(true);
        setTimeout(() => setShowButtons(false), 3000); // change 3000 to the number of milliseconds you want the buttons to appear for
    };

    const renderNotes = (parentId = null) => {
        return (
            <div>
                {notes
                    .filter((note) => note.parent === parentId)
                    .map((note) => (
                        <div className="note-body" key={note.id} >
                            <NoteButton
                                note={note}
                                passNoteInfoHandler={passNoteInfoOnHoverHandler}
                                selectedNodes={selectedNodes}
                                showChildrenOnClickHandler={showChildrenOnClickHandler} />
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
