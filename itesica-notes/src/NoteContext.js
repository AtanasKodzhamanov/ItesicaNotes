import React from 'react'
import useNotes from './hooks/useNotes'

export const NoteContext = React.createContext()


export const NoteProvider = ({ children, authToken, isLoggedIn }) => {
    const {
        notes,
        editedNodesHistory,
        createNode,
        updateNode,
        deleteNode,
        toggleMarked,
        renderChildren,
        getHistory
    } = useNotes(authToken, isLoggedIn)




    return (
        <NoteContext.Provider
            value={{
                notes,
                editedNodesHistory,
                createNode,
                updateNode,
                deleteNode,
                toggleMarked,
                renderChildren,
                getHistory,
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export default NoteContext
