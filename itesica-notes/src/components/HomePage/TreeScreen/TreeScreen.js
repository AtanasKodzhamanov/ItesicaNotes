
import React, { useState, useEffect } from 'react';
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm';
import RenderNotes from './RenderNotes/RenderNotes';

const TreeScreen = ({ notes, passNoteInfoHandler, createChildNode, deleteNodeHandler, currentNotebookID, createNode }) => {

    return (
        <>
            {currentNotebookID != null ?
                <>
                    <ExpandableNewNodeForm
                        createNode={createNode}
                        currentNotebookID={currentNotebookID} />

                    <RenderNotes
                        notes={notes}
                        currentNotebookID={currentNotebookID}
                        passNoteInfoHandler={passNoteInfoHandler}
                        createChildNode={createChildNode}
                        deleteNodeHandler={deleteNodeHandler}
                    /></>
                : "Open or create a notebook to get started!"}
        </>
    )

}

export default TreeScreen