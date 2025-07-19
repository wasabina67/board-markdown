import React, { useState } from 'react'
import './App.css'

interface StickyNote {
  id: number;
  x: number;
  y: number;
  title: string;
  content: string;
  color: string;
  rotation: number;
}

interface DragState {
  isDragging: boolean
  noteId: number | null
  startX: number
  startY: number
}

interface ContextMenuState {
  isVisible: boolean
  noteId: number | null
  x: number
  y: number
}

interface EditState {
  isEditing: boolean
  noteId: number | null
  title: string
  content: string
}

const dragStateData: DragState = {
  isDragging: false,
  noteId: null,
  startX: 0,
  startY: 0
}

const contextMenuStateData: ContextMenuState = {
  isVisible: false,
  noteId: null,
  x: 0,
  y: 0
}

const editStateData: EditState = {
  isEditing: false,
  noteId: null,
  title: '',
  content: ''
}

const areas: string[] = [
  "To Do", "Icebox", "In progress", "Done"
]

function App() {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([])
  const [dragState, setDragState] = useState<DragState>(dragStateData)
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>(contextMenuStateData)
  const [editState, setEditState] = useState<EditState>(editStateData)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || dragState.noteId === null) return
    const rect = e.currentTarget.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragState.startX
    const newY = e.clientY - rect.top - dragState.startY

    setStickyNotes(notes =>
      notes.map(note =>
        note.id === dragState.noteId
          ? { ...note, x: Math.max(0, newX), y: Math.max(0, newY) }
          : note
      )
    )
  }

  const handleMouseUp = () => {
    setDragState(dragStateData)
  }

  const handleMouseLeave = () => {
    setDragState(dragStateData)
  }

  const handleClickOutside = () => {
    setContextMenuState(contextMenuStateData)
  }

  const handleMouseDown = (e: React.MouseEvent, noteId: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    const status: DragState = {
      isDragging: true,
      noteId,
      startX: offsetX,
      startY: offsetY
    }

    setDragState(status)
  }

  const handleContextMenu = (e: React.MouseEvent, noteId: number) => {
    e.preventDefault()
    const ctr = document.querySelector('.sticky-notes-container') as HTMLElement
    const rect = ctr.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    const status: ContextMenuState = {
      isVisible: true,
      noteId,
      x: offsetX,
      y: offsetY
    }

    setContextMenuState(status)
  }

  const handleEditClick = () => {
    if (contextMenuState.noteId === null) return

    const note = stickyNotes.find(n => n.id === contextMenuState.noteId)
    if (note) {
      const status: EditState = {
        isEditing: true,
        noteId: note.id,
        title: note.title,
        content: note.content
      }
      setEditState(status)
    } else {
      alert('Error!')
    }

    setContextMenuState(contextMenuStateData)
  }

  const handleEditSaveClick = () => {
    if (editState.noteId === null) return

    setStickyNotes(notes =>
      notes.map(note =>
        note.id === editState.noteId
          ? { ...note, title: editState.title, content: editState.content }
          : note
      )
    )

    setEditState(editStateData)
  }

  const handleEditCancelClick = () => {
    setEditState(editStateData)
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('board-markdown.stickyNotes', JSON.stringify(stickyNotes))
      alert('Success!')
    } catch (err) {
      console.error('Error:', err)
      alert('Error!')
    }
  }

  React.useEffect(() => {
    try {
      const savedStickyNotes = localStorage.getItem('board-markdown.stickyNotes')
      if (savedStickyNotes) {
        setStickyNotes(JSON.parse(savedStickyNotes))
        return
      }
    } catch (err) {
      console.error('Error:', err)
    }

    fetch('/board-markdown/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data: StickyNote[]) => {
        setStickyNotes(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <div className="board-container">
        <h1>
          <a href="https://wasabina67.github.io/board-markdown/">Board markdown</a>
          <button
            className="save"
            onClick={saveToLocalStorage}
          >
            Save
          </button>
        </h1>
        <div
          className="sticky-notes-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClick={handleClickOutside}
        >
            {areas.map((name, idx) => (
            <div key={idx} className="sticky-notes-area">
              {name}
            </div>
            ))}
          {stickyNotes.map((note) => (
            <div
              key={note.id}
              className="sticky-note"
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                backgroundColor: note.color,
                transform: `rotate(${note.rotation}deg)`,
                userSelect: 'none',
                cursor: dragState.isDragging && dragState.noteId === note.id ? 'grabbing' : 'grab',
              }}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
              onContextMenu={(e) => handleContextMenu(e, note.id)}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}

          {contextMenuState.isVisible && (
            <div
              className="context-menu"
              style={{
                left: `${contextMenuState.x}px`,
                top: `${contextMenuState.y}px`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="context-menu-item"
                onClick={handleEditClick}
              >
                Edit
              </div>
            </div>
          )}

          {editState.isEditing && (
            <div>
              Edit
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default App
