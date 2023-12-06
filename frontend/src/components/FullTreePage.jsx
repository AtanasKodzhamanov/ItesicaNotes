import styles from  "./FullTreePage.module.css"
import NoteBooksBar from "./HomePage/NotebooksBar/NoteBooksBar"
import { useState } from "react"
import { useContext } from "react"
import { NoteContext } from '../context/NoteContext';

const FullTreePage = () => {


    const {
        notes,
    } = useContext(NoteContext)

    const [currentNotebookID, setCurrentNotebookID] = useState(null)

    const openNoteBookHandler = (title) => {
        setCurrentNotebookID(title)
      }

      const updateNotebookID = () => {
        setCurrentNotebookID(null)
      }

      const deleteNodeHandler = (note) => {

      };

    return (
        <div className={styles.fullTreePage}>
            <NoteBooksBar
                location = "full-tree"
                openNoteBookHandler={openNoteBookHandler}
                updateNotebookID={updateNotebookID}
                deleteNodeHandler={deleteNodeHandler}
                currentNotebookID={currentNotebookID}
            />
        </div>
    )
}

export default FullTreePage