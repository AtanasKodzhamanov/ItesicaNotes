import react from 'react'
import RenderNotebooks from '../RenderNotebooks/RenderNotebooks'
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const NoteBooksBar = ({ notes, openNoteBookHandler, deleteNodeHandler, updateNotebookID, createNode, currentNotebookID }) => {

    const [animationParent] = useAutoAnimate()


    return (
        <>
            <div className="notebooks-only" ref={animationParent}>
                <RenderNotebooks
                    notes={notes}
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