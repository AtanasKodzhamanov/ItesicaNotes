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


  const createNode = async (title, content, parentId = null) => {
    console.log('createNode', title, content, parentId)
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
        // Fetch the updated parent node from the server
        const parentResponse = await fetch(`http://localhost:8000/api/notes/${parentId}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authToken}`,
          },

        });

        if (parentResponse.ok) {
          const updatedParent = await parentResponse.json();
          setNotes(prevNotes => {
            const newNotes = [...prevNotes];
            const parentIndex = newNotes.findIndex(note => note.id === parentId);

            // Use the server's version of the parent node, which should include the new child
            newNotes[parentIndex] = updatedParent;
            newNotes.push(newNode);
            return newNotes;
          });

        } else {
          const errorData = await parentResponse.json();
          console.error('Error fetching updated parent node:', errorData);
        }
      } else {
        setNotes(prevNotes => [...prevNotes, newNode]);
      }
    } else {
      const errorData = await response.json();
    }
  };

  const updateNode = async (id, title, content, marked) => {
    const authToken = localStorage.getItem('authToken')
    const userId = parseInt(localStorage.getItem('userId'), 10)
    const updateObj = {}

    updateObj.titleUpdate = title
    updateObj.contentUpdate = content

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
    const authToken = localStorage.getItem('authToken');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    console.log('Deleting node:', id);

    const response = await fetch(
      `http://localhost:8000/api/notes/${id}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({ user: userId }),
      }
    );

    if (!response.ok) {
      console.error('Failed to delete node');
    }
    else {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const getHistory = async (id) => {
    const authToken = localStorage.getItem('authToken');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    const response = await fetch(`http://localhost:8000/api/notehistories/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.ok) {
      const history = await response.json();
      console.log('History:', history);
    } else {
      const errorData = await response.json();
      console.error('Error fetching history:', errorData);
    }
  };


  return {
    notes,
    visibleNotes,
    editedNodesHistory,
    toggleChildrenVisibility,
    toggleMarked,
    createNode,
    updateNode,
    deleteNode,
    getHistory,
  }
}

export default useNotes
