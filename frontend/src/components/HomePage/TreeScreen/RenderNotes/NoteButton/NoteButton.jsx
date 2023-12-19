import React, { useState, useEffect } from 'react';
import styles from './NoteButton.module.css';

const NoteButton = ({ note, passNoteInfoHandler, selectedNodes, showChildrenOnClickHandler, createChildNode, deleteNodeHandler }) => {

    const handleClick = (note) => {
        showChildrenOnClickHandler(note);
    };

    useEffect(() => {
        console.log("selectedNodes changed");
    }, [selectedNodes]);


    return (
        <div className={styles.noteButtonContainer}>
            <h3 className={styles.childrenCount}>
                {note.children.length}
            </h3>
            <h4
                className={`${styles.noteContainer} ${selectedNodes.some(node => node.id === note.id) || note.children.length === 0 ? styles.active : ''}`}
                onMouseEnter={() => passNoteInfoHandler(note)}
                onClick={() => handleClick(note)}
            >
                {note.title}
            </h4>
            <div className={styles.buttonGroup}>
                <button onClick={() => createChildNode(note)} className={`${styles.noteButton} ${styles.new}`} > <p>+</p></button>
                <button onClick={() => deleteNodeHandler(note)} className={`${styles.noteButton} ${styles.delete}`}><p>x</p></button>
            </div>
        </div >
    );
};

export default NoteButton;
