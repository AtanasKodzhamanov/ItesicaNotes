import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './RenderNotebooks.css';
import { useContext } from 'react';
import { NoteContext } from '../../../../context/NoteContext';

// Drag and Drop functionality 
// 1. First we need to define the draggable component. Here this is Note.
// 1.1 Inside the Note component we need to define the dragRef. This is a reference to the DOM node that we want to make draggable. The node is defined in the return statement of the Note component. 
// 1.2 item: Using the useDrag hook we define the information that the draggable component will carry with it.
// 1.3 type: The type of the draggable component. Here it is note. This is used to identify the type of the component when it is dropped.
// 1.4 end: Holds the logic that is executed when the draggable component is dropped
// 1.5 collect: This is a function that is used to extract data from the monitor (an object that keeps track of the drag and drop state). It's used to define what information should be collected about the drag state. In this case, it's checking if the note is currently being dragged.
// 1.6 Other: begin will be executed when the drag begins. canDrag is used to define if the component can be dragged.
// 2. Then we need to define the drop in component. Here this is Bin.
// 2.1 accept: The type of the draggable component that can be dropped into this component. Here it is note.
// 2.2 drop: Holds the logic that is executed when the draggable component is dropped
// 2.3 collect: This is a function that is used to extract data from the monitor (an object that keeps track of the drag and drop state). It's used to define what information should be collected about the drop state. In this case, it's checking if the note is currently being dragged and if it can be dropped.
// 2.4 Other: hover will be executed when the draggable component is hovered over the drop in component. canDrop is used to define if the component can be dropped.

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
