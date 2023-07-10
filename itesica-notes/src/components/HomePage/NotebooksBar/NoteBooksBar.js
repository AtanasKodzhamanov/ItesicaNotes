import react from 'react'
import RenderNotebooks from './RenderNotebooks/RenderNotebooks'
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useContext } from 'react'
import { NoteContext } from '../../../NoteContext'

const NoteBooksBar = ({ openNoteBookHandler, deleteNodeHandler, updateNotebookID, currentNotebookID }) => {


    const {
        createNode,
        notes,
    } = useContext(NoteContext)

    const [animationParent] = useAutoAnimate()


    return (
        <>
            <div className="notebooks-only" ref={animationParent}>
                <RenderNotebooks
                    openNoteBookHandler={openNoteBookHandler}
                    deleteNodeHandler={deleteNodeHandler}
                    updateNotebookID={updateNotebookID}
                />
            </div>
            <button
                className="new-notebook-button"
            >
                <ExpandableNewNodeForm
                    onCreate={createNode}
                    currentNotebookID={currentNotebookID} />
            </button>
        </>
    )
}

export default NoteBooksBar