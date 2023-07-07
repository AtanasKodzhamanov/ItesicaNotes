import React, { useState, useEffect } from 'react';
import './RenderNotes.css';
import NoteButton from './NoteButton/NoteButton';

const RenderNotes = ({ notes, passNoteInfoHandler, createChildNode, deleteNodeHandler }) => {
    const [selectedNodes, setSelectedNodes] = useState([]);


    const showChildrenOnClickHandler = (note) => {
        setSelectedNodes(prevNotes => {
            const isNoteSelected = prevNotes.some(selectedNote => selectedNote.id === note.id);
            if (isNoteSelected) {
                return prevNotes.filter(selectedNote => selectedNote.id !== note.id);
            } else {
                return [...prevNotes, note];
            }
        });
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
                            <NoteButton
                                note={note}
                                passNoteInfoHandler={passNoteInfoOnHoverHandler}
                                selectedNodes={selectedNodes}
                                showChildrenOnClickHandler={showChildrenOnClickHandler}
                                createChildNode={createChildNode}
                                deleteNodeHandler={deleteNodeHandler} />
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
