import RenderNotebooks from './RenderNotebooks/RenderNotebooks'
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const NoteBooksBar = ({ openNoteBookHandler, deleteNodeHandler, updateNotebookID, currentNotebookID }) => {

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
            <div
                className="new-notebook-button"
            >
                <ExpandableNewNodeForm
                    currentNotebookID={null} />
            </div>
        </>
    )
}

export default NoteBooksBar