import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { NoteContext } from '../../../NoteContext'

const NoteTextArea = ({ parentNode, selectedNote, newChildNodeForm, setNewChildNodeForm }) => {

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
                        <div className='note-text-area'>
                            <textarea
                                className="note-title-input"
                                placeholder="Enter title..."
                                value={childTitle}
                                onChange={e => setChildTitle(e.target.value)}
                            />
                            <textarea
                                className="note-text-input"
                                placeholder="Enter note..."
                                value={childText}
                                onChange={e => setChildText(e.target.value)}
                            />
                            <div className="utility-buttons">
                                <button className="save-button" onClick={saveChildNodeHandler}>Save</button>
                                <button className="cancle-button" onClick={cancleChildNodeHandler}>X</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={`note-text-area`}>

                            <textarea
                                className={`note-title-input ${borderEffectTitle ? 'edit-border' : ''}`}
                                placeholder="Enter title..."
                                value={noteTitle}
                                onChange={e => setNoteTitle(e.target.value)}
                                onBlur={handleBlur}
                            />
                            <textarea
                                className={`note-text-input ${borderEffectText ? 'edit-border' : ''}`}
                                placeholder="Enter note..."
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                    </>
            }
        </>
    )
}

export default NoteTextArea