import React, { useState, useEffect, useRef } from 'react';
import NoteButton from './NoteButton/NoteButton';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useContext } from 'react';
import { NoteContext } from '../../../../context/NoteContext';
import styles from './RenderNotes.module.css';

const RenderNotes = ({ passNoteInfoHandler, createChildNode, deleteNodeHandler, currentNotebookID }) => {
    const [selectedNodes, setSelectedNodes] = useState([]);
    const {
        notes,
        getHistory,
        getAllHistory,
    } = useContext(NoteContext)

    useEffect(() => {
        console.log(getAllHistory())
    }, [notes])

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

    useEffect(() => { console.log(selectedNodes) }, [selectedNodes]);

    const passNoteInfoOnHoverHandler = (note) => {
        passNoteInfoHandler(note)
        getHistory(note.id)
    };

    const [animationParent] = useAutoAnimate()

    const renderNotes = (parentId = null) => {
        return (
            <div ref={animationParent}>
                {notes
                    .filter((note) => note.parent === parentId)
                    .map((note) => (
                        <div className={styles.noteBody} ref={animationParent} key={note.id} >
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

    return renderNotes(currentNotebookID);
};

export default RenderNotes;
