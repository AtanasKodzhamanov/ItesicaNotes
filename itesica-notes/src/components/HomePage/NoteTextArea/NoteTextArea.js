import react from 'react'

const NoteTextArea = ({ }) => {

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