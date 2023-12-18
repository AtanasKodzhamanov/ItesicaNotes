import RenderNotebooks from './RenderNotebooks/RenderNotebooks'
import ExpandableNewNodeForm from '../NewParentNode/ExpandableNewNodeForm'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import styles from './NoteBooksBar.module.css'
import { useContext } from 'react'
import { NoteContext } from '../../../context/NoteContext'
import RecursiveTree from './RecursiveTree'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const NoteBooksBar = ({ location, openNoteBookHandler, deleteNodeHandler, updateNotebookID, currentNotebookID }) => {

    const [animationParent] = useAutoAnimate()
    console.log(currentNotebookID)
    const {notes} = useContext(NoteContext)


    const downloadPDF = () => {
        html2canvas(document.getElementById('tree-content')).then(canvas => {
            const imgHeight = canvas.height * 210 / canvas.width; // Calculate the height of the image in the A4 aspect ratio
            const pdf = new jsPDF('p', 'mm', [210, imgHeight]);   // Create a PDF with a custom height
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, imgHeight);
            pdf.save('download.pdf');
        });
    };

    return (
        location !== "full-tree" ? (
        <>  
            <div className={styles.notebooks}>
                <ExpandableNewNodeForm
                    currentNotebookID={null} />
                <div className={styles.notebooksOnly} ref={animationParent}>
                    <RenderNotebooks
                        openNoteBookHandler={openNoteBookHandler}
                        deleteNodeHandler={deleteNodeHandler}
                        updateNotebookID={updateNotebookID}
                    />
                </div>
            </div>
        </>
        )
        : 
        <>
            <div className={styles.notebooksOnly} ref={animationParent}>
                <RenderNotebooks
                    openNoteBookHandler={openNoteBookHandler}
                    deleteNodeHandler={deleteNodeHandler}
                    updateNotebookID={updateNotebookID}
                />
            </div>
            <button className={styles.buttonRow} onClick={downloadPDF}>
                <p>DOWNLOAD PDF</p>
                <span className="material-symbols-outlined">
                download
                </span>
            </button>
            <h1>{notes.filter(note => note.id == currentNotebookID).title}</h1>

            <div className={styles.pagePrint} id="tree-content">
                <RecursiveTree currentNotebookID={currentNotebookID} />
            </div>
        </>
        )
}

export default NoteBooksBar