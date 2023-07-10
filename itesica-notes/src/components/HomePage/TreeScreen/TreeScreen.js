
import React, { useState, useEffect } from 'react';
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
                    /></>
                : "Open or create a notebook to get started!"}
        </>
    )

}

export default TreeScreen