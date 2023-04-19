import { useState, useEffect } from "react";


const useNotes = (authToken, isLoggedIn) => {
    const [notes, setNotes] = useState([]);
    const [visibleNotes, setVisibleNotes] = useState([]);
    const [editedNodesHistory, setEditedNodesHistory] = useState([]);

    useEffect(() => {
        const editedNodesHistoryString = localStorage.getItem('editedNodesHistory');
        const editedNodesHistory = JSON.parse(editedNodesHistoryString) || [];
        setEditedNodesHistory(editedNodesHistory);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:8000/api/notes/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setNotes(data))
                .catch((error) => console.error(error));
        }
    }, [isLoggedIn, authToken]);

    const toggleChildrenVisibility = (id) => {
        if (visibleNotes.includes(id)) {
            setVisibleNotes(visibleNotes.filter((noteId) => noteId !== id));
        } else {
            setVisibleNotes([...visibleNotes, id]);
        }
    };


    const updateParent = (parentId, childId, notes, setNotes) => {
        const parentIndex = notes.findIndex((note) => note.id === parentId);
        const childIndex = notes.findIndex((note) => note.id === childId);
        const newNotes = [...notes];
        newNotes[parentIndex].children.push(newNotes[childIndex]);
        newNotes.splice(childIndex, 1);
        setNotes(newNotes);
    };



    const createNode = async (title, content, parentId = null) => {
        const authToken = localStorage.getItem("authToken");
        const userId = parseInt(localStorage.getItem("userId"), 10);

        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        const response = await fetch("http://localhost:8000/api/notes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify({ title, content, user: userId, parent: parentId }),
        });

        if (response.ok) {
            const newNode = await response.json();
            if (parentId) {
                const parentIndex = notes.findIndex((note) => note.id === parentId);
                const newNotes = [...notes];
                newNotes[parentIndex].children.push(newNode);
                setNotes(newNotes);
            } else {
                setNotes([...notes, newNode]);
            }
        } else {
            const errorData = await response.json();
            console.error("Error creating node:", errorData);
        }
    };



    const updateNode = async (id, title, content) => {
        const authToken = localStorage.getItem("authToken");
        const userId = parseInt(localStorage.getItem("userId"), 10);

        const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify({ title, content, user: userId }),
        });

        if (response.ok) {
            const updatedNode = await response.json();
            const originalNode = notes.find((note) => note.id === id);
            const updatedEditedNodesHistory = [...editedNodesHistory, { ...updatedNode, oldTitle: originalNode.title, oldContent: originalNode.content }];

            // Store the updated array in localStorage
            localStorage.setItem('editedNodesHistory', JSON.stringify(updatedEditedNodesHistory));

            // Update the state of the editedNodesHistory variable
            setEditedNodesHistory(updatedEditedNodesHistory);

            setNotes(
                notes.map((node) =>
                    node.id === updatedNode.id ? updatedNode : node
                )
            );
        } else {
            const errorData = await response.json(); // Get the error data
            console.error("Failed to update node:", errorData); // Print the error data
        }
    };

    const deleteNode = async (id) => {
        const authToken = localStorage.getItem("authToken");
        const userId = parseInt(localStorage.getItem("userId"), 10);

        const deleteNodeRecursive = async (nodeId) => {
            const node = notes.find((note) => note.id === nodeId);

            if (node && node.children) {
                for (const childId of node.children) {
                    await deleteNodeRecursive(childId);
                }
            }

            const response = await fetch(`http://localhost:8000/api/notes/${nodeId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify({ user: userId }),
            });

            if (!response.ok) {
                console.error("Failed to delete node");
            }
        };
        const nodeToDelete = notes.find((note) => note.id === id);
        setEditedNodesHistory([...editedNodesHistory, nodeToDelete]);

        await deleteNodeRecursive(id);
        setNotes(notes.filter((note) => note.id !== id));
    };

    return {
        notes,
        visibleNotes,
        editedNodesHistory,
        toggleChildrenVisibility,
        updateParent,
        createNode,
        updateNode,
        deleteNode,
    };

}

export default useNotes;