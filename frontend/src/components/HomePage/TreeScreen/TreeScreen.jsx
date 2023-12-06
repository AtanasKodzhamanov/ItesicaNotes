
import React from 'react';
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm';
import RenderNotes from './RenderNotes/RenderNotes';

const TreeScreen = ({ passNoteInfoHandler, createChildNode, deleteNodeHandler, currentNotebookID }) => {


    return (
        <>
            {currentNotebookID != null ?
                <>
                    <ExpandableNewNodeForm
                        currentNotebookID={currentNotebookID} />

                    <RenderNotes
                        currentNotebookID={currentNotebookID}
                        passNoteInfoHandler={passNoteInfoHandler}
                        createChildNode={createChildNode}
                        deleteNodeHandler={deleteNodeHandler}
                    />
                </>
                : <div>
                    <h2>OPEN A NOTEBOOK </h2>
                    <h2>OR CREATE ONE USING THE PLUS SYMBOL IN THE RIGHT CORNER</h2>
                </div>
                }
        </>
    )

}

export default TreeScreen