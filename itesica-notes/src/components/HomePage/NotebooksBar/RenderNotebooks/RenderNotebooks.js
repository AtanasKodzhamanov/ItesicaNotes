import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './RenderNotebooks.css';
import { useContext } from 'react';
import { NoteContext } from '../../../../NoteContext';

// Component for note
const Note = ({ note, onNoteDropped, openNoteBookHandler }) => {

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'note',
        item: { id: note.id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onNoteDropped(note);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));



    return (
        <button
            className="open-notebook-button"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            ref={dragRef}
            onClick={() => openNoteBookHandler(note.id)}
        >
            <h1>{note.title}</h1>
        </button>
    );
};

// Component for bin
const Bin = () => {
    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: 'note',
        drop: () => ({ name: 'Bin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div
            ref={dropRef}
            className={`bin ${isOver ? 'hovered' : ''}`}
        >
            <p>Drop To Delete</p>
        </div>
    );
};

const RenderNotebooks = ({ openNoteBookHandler, deleteNodeHandler, updateNotebookID }) => {

    const {
        notes,
    } = useContext(NoteContext)


    const onNoteDropped = (note) => {
        // Add logic here to delete note when dropped into the bin
        // Make sure to update your state to reflect this deletion
        console.log('Note dropped into bin', note);
        deleteNodeHandler(note);
        console.log("delete", note)
        if (note.parent == null) {
            updateNotebookID()
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <>
                {notes
                    .filter((note) => note.parent === null)
                    .map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onNoteDropped={onNoteDropped}
                            openNoteBookHandler={openNoteBookHandler}
                        />
                    ))}
                <Bin />
            </>
        </DndProvider>
    );
};

export default RenderNotebooks;
