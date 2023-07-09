import React from 'react';


const RenderNotebooks = ({ notes, openNoteBookHandler }) => {


    return (
        <>
            {notes
                .filter((note) => note.parent === null)
                .map((note) => (
                    <button
                        className="open-notebook-button"
                        key={note.id}
                        onClick={() => openNoteBookHandler(note.id)}
                    >
                        <h1>{note.title}</h1>
                    </button>
                ))}
            <div className="bin">
                drop here
            </div>
        </>
    );
};

export default RenderNotebooks;
