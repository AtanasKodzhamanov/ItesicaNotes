import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import styles from './NoteTextArea.module.css'

const NoteTextArea = ({ currentNotebookID, parentNode, selectedNote, newChildNodeForm, setNewChildNodeForm }) => {

    const [borderEffectTitle, setBorderEffectTitle] = useState(false);
    const [borderEffectText, setBorderEffectText] = useState(false);

    const [noteId, setNoteId] = useState(null)
    const [noteText, setNoteText] = useState("")
    const [noteTitle, setNoteTitle] = useState("")
    const [originalNoteText, setOriginalNoteText] = useState("")
    const [originalNoteTitle, setOriginalNoteTitle] = useState("")
    const [childText, setChildText] = useState("")
    const [childTitle, setChildTitle] = useState("")

    const {
        createNode,
        updateNode,
    } = useContext(NoteContext)

    useEffect(() => {
        setNoteId(selectedNote.id)
        setNoteText(selectedNote.content)
        setNoteTitle(selectedNote.title)
        setOriginalNoteText(selectedNote.content)
        setOriginalNoteTitle(selectedNote.title)
    }, [selectedNote])

    // when a user types in a note text area and then clicks outside of the text area, the note is automatically updated
    const handleBlur = () => {
        if (noteTitle === "" || noteText === "") {
            alert('Note title or text can\'t be missing.');
        } else {
            if (noteText !== originalNoteText) {
                setOriginalNoteText(noteText);
                setBorderEffectText(true);
                setTimeout(() => setBorderEffectText(false), 750);
            }

            if (noteTitle !== originalNoteTitle) {
                setOriginalNoteTitle(noteTitle);
                setBorderEffectTitle(true);
                setTimeout(() => setBorderEffectTitle(false), 750);
            }

            if (noteTitle !== originalNoteTitle || noteText !== originalNoteText) {
                updateNode(noteId, noteTitle, noteText);
            }
        }
    };

    // when a user clicks on the save button, the new child node is created
    const saveChildNodeHandler = async (e) => {
        if (childTitle.trim() !== "" && childText.trim() !== "") {
            e.preventDefault();
            setNewChildNodeForm(false)
            createNode(childTitle, childText, parentNode.id);
            setChildText("")
            setChildTitle("")
        }
    }

    // when a user clicks on the cancle button, the new child node form is closed
    const cancleChildNodeHandler = () => {
        setNewChildNodeForm(false)
    }
    return (
        <>
            {
                newChildNodeForm ?
                    <>
                        <div className={styles.newNoteContainer}>
                            <textarea
                                className={styles.noteTitleInput}
                                placeholder="Enter title..."
                                value={childTitle}
                                onChange={e => setChildTitle(e.target.value)}
                            />
                            <textarea
                                className={styles.noteTextInput}
                                placeholder="Enter note..."
                                value={childText}
                                onChange={e => setChildText(e.target.value)}
                            />
                            <div className={styles.utilityButtons}>
                                <button className={styles.saveButton} onClick={saveChildNodeHandler}>Save</button>
                                <button className={styles.cancleButton} onClick={cancleChildNodeHandler}>X</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {currentNotebookID !== null ?
                        <div className={styles.newNoteContainer}>
                            <textarea
                                className={`${styles.noteTitleInput} ${borderEffectTitle ? 'editBorder' : ''}`}
                                placeholder="Enter title..."
                                value={noteTitle}
                                onChange={e => setNoteTitle(e.target.value)}
                                onBlur={handleBlur}
                            />
                            <textarea
                                className={`${styles.noteTextInput} ${borderEffectText ? 'editBorder' : ''}`}
                                placeholder="Enter note..."
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        : <h2 style={{ textAlign: 'center' }} >NO ACTIVE NOTEBOOK</h2>}
                    </>
            }
        </>
    )
}

export default NoteTextArea