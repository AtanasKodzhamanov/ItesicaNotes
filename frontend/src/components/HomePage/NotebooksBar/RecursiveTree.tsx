import React, { useContext } from 'react';
import { NoteContext } from '../../../context/NoteContext';
import styles from './RecursiveTree.module.css';

interface RecursiveTreeProps {
    currentNotebookID: number;
}

interface Note {
    id: number;
    title: string;
    parent: number; 
    content: string;
}

const RecursiveTree: React.FC<RecursiveTreeProps> = ({ currentNotebookID }) => {
    console.log(currentNotebookID);
    console.log("RecursiveTree")
    
    const { notes } = useContext(NoteContext) as { notes: Note[] }; // Cast the context to the correct type

    // filter the notes to only show the notes that have the currentNotebookID as their parent_id
    // pass those ids to the recursive tree
    // build up an array of the children of the currentNotebookID
    // if the array is empty, return null
    // if the array is not empty map over the array and return the children's content
    console.log(notes);
    const childrenIDs = notes.filter(note => note.parent === currentNotebookID).map(note => note.id);
    let fullTreeNotes = [];
    let fullTreeRender = null;
    if (childrenIDs.length > 0) {
        fullTreeNotes = notes.filter(note => childrenIDs.includes(note.id));
        fullTreeRender = fullTreeNotes.map(note => 
        <>
        <div key={note.id} className={styles.contentContainer}>
            <h1>{note.title}</h1>
            <p> {note.content}</p>
        </div>
        </>
        );
    }
    console.log(childrenIDs);
    console.log(fullTreeRender);
    return (
        <>
            {childrenIDs.length > 0 && childrenIDs.map(childID => 
            <>
                <div key={childID} className={styles.contentContainer}>
                    {notes.filter(note => note.id === childID).map(note =>
                        <div key={note.id}>
                            <h1>{note.title}</h1>
                            <p> {note.content}</p>
                        </div>
                    )}    
                    <RecursiveTree currentNotebookID={childID} />
                </div>
            </>)}
        </>
    );
}

export default RecursiveTree;
