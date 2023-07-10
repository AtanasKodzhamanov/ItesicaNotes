import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})


// Testing to do:
// Test that a notebook is created when the user clicks the plus button, parent must be null
// Test that the notebook is delted when dragged on the bin with all its children
// Test that if a notebook is deleted the currentNotebookID is set to null and tree and text area are cleared
// Test that if a small plus is clicked a new note is created
// Test that if a note is created its parent is set to the currentNotebookID