import { useState, useEffect } from 'react'

const useNotes = (authToken, isLoggedIn) => {
  const [notes, setNotes] = useState([])
  const [visibleNotes, setVisibleNotes] = useState([])
  const [editedNodesHistory, setEditedNodesHistory] = useState([])

  useEffect(() => {
    const editedNodesHistoryString = localStorage.getItem('editedNodesHistory')
    const editedNodesHistory = JSON.parse(editedNodesHistoryString) || []
    setEditedNodesHistory(editedNodesHistory)
  }, [])

  // if user is loggedin get all notes data into notes state
  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .catch((error) => console.error(error))
    }
  }, [isLoggedIn, authToken])

  // notes is an array of objects, each object has a children and parent properties which hold ids


  const toggleChildrenVisibility = (id) => {
    if (visibleNotes.includes(id)) {
      setVisibleNotes(visibleNotes.filter((noteId) => noteId !== id))
    } else {
      setVisibleNotes([...visibleNotes, id])
    }
  }

  const toggleMarked = async (id, marked) => {
    console.log('toggleMarked', id, marked)
    const updatedMarked = !marked
    await updateNode(id, null, null, updatedMarked)
  }

  const updateParent = (parentId, childId, notes, setNotes) => {
    const parentIndex = notes.findIndex((note) => note.id === parentId)
    const childIndex = notes.findIndex((note) => note.id === childId)
    const newNotes = [...notes]
    newNotes[parentIndex].children.push(newNotes[childIndex])
    newNotes.splice(childIndex, 1)
    setNotes(newNotes)
  }

  const createNode = async (title, content, parentId = null) => {
    const authToken = localStorage.getItem('authToken');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const response = await fetch('http://localhost:8000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ title, content, user: userId, parent: parentId }),
    });

    if (response.ok) {
      const newNode = await response.json();
      if (parentId) {
        setNotes(prevNotes => {
          const newNotes = [...prevNotes];
          const parentIndex = newNotes.findIndex(note => note.id === parentId);
          const updatedParent = {
            ...newNotes[parentIndex],
            children: [...newNotes[parentIndex].children, newNode.id],
          };
          newNotes[parentIndex] = updatedParent;
          newNotes.push(newNode);
          return newNotes;
        });
        console.log('New child', notes);
      } else {
        setNotes(prevNotes => [...prevNotes, newNode]);
        console.log('No parent:', notes);
      }
    } else {
      const errorData = await response.json();
      console.error('Error creating node:', errorData);
    }
  };



  const updateNode = async (id, title, content, marked) => {
    const authToken = localStorage.getItem('authToken')
    const userId = parseInt(localStorage.getItem('userId'), 10)
    const updateObj = {}

    if (title == null && content == null) {
      const originalNode = notes.find((note) => note.id === id)
      updateObj.titleUpdate = notes.find((note) => note.id === id).title
      updateObj.contentUpdate = notes.find((note) => note.id === id).content
      console.log('both null')
    } else {
      updateObj.titleUpdate = title
      updateObj.contentUpdate = content
      console.log('not null')
    }

    const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({
        title: updateObj.titleUpdate,
        content: updateObj.contentUpdate,
        user: userId,
        marked,
      }),
    })

    if (response.ok) {
      const updatedNode = await response.json()
      const originalNode = notes.find((note) => note.id === id)
      const updatedEditedNodesHistory = [
        ...editedNodesHistory,
        {
          ...updatedNode,
          oldTitle: originalNode.title,
          oldContent: originalNode.content,
        },
      ]

      localStorage.setItem(
        'editedNodesHistory',
        JSON.stringify(updatedEditedNodesHistory)
      )

      if (title != null && content != null) {
        setEditedNodesHistory(updatedEditedNodesHistory)
      }

      setNotes(
        notes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
      )
    } else {
      const errorData = await response.json()
      console.error('Failed to update node:', errorData)
    }
  }

  const deleteNode = async (id) => {
    const authToken = localStorage.getItem('authToken')
    const userId = parseInt(localStorage.getItem('userId'), 10)

    const deleteNodeRecursive = async (nodeId) => {
      const node = notes.find((note) => note.id === nodeId)

      if (node && node.children) {
        for (const childId of node.children) {
          await deleteNodeRecursive(childId)
        }
      }

      const response = await fetch(
        `http://localhost:8000/api/notes/${nodeId}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify({ user: userId }),
        }
      )

      if (!response.ok) {
        console.error('Failed to delete node')
      }
    }
    await deleteNodeRecursive(id)
    setNotes(prevNotes => prevNotes.filter((note) => note.id !== id))
  }


  return {
    notes,
    visibleNotes,
    editedNodesHistory,
    toggleChildrenVisibility,
    toggleMarked,
    updateParent,
    createNode,
    updateNode,
    deleteNode,
  }
}

export default useNotes
