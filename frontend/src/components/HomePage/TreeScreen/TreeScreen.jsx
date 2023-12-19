
import React from 'react';
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm';
import RenderNotes from './RenderNotes/RenderNotes';
import styles from './TreeScreen.module.css';

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
                : <div className={styles.instructionsPanel}>
                    <h2>USER INSTRUCTIONS</h2>
                    <div className={styles.instructionsRow}>
                        <div>
                            <h3>Open a notebook</h3>
                            <p>click on the notebook's name</p>
                        </div>
                        <div>
                            <h3>Create a notebook</h3>
                            <p>click on "+" to create a new notebook</p>
                        </div>
                    </div>
                    <div className={styles.instructionsRow}>
                        <div>
                            <h3>Delete a notebook</h3>
                            <p>drag and drop notebook to the bin area</p>
                        </div>
                        <div>
                            <h3>Download notes</h3>
                            <p>Click on full tree, choose a notebook and download to pdf</p>
                        </div>
                    </div>
                    <div className={styles.instructionsRow}>
                        <div>
                            <h3>Add a branch</h3>
                            <p>To add a new root level branch to a notebook use the "+" sign inside the open notebook</p>
                        </div>
                        <div>
                            <h3>Add a note</h3>
                            <p>To add a note to branch click on the "+" symbol on the right side of the note</p>
                        </div>
                    </div>
                    <div className={styles.instructionsRow}>
                        <div>
                            <h3>Edit a note</h3>
                            <p>To edit a note you can directly change the text and title in the text boxes and any changes will be saved when clicking outside of the text area</p>
                            <p>When a text area is subject to editing it will be highlighted in red</p>
                            <p>A successful edit will result in a green flash around the text area</p>
                        </div>
                    </div>
                </div>
                }
        </>
    )

}

export default TreeScreen