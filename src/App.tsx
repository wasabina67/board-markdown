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

const stickyNotesData: StickyNote[] = [
  {
    id: 1,
    x: 50,
    y: 0,
    title: "Task",
    content: "・task-1\n・task-2\n・task-3\n・task-4\n・task-5",
    color: "#ffeb3b",
    rotation: 0
  },
  {
    id: 2,
    x: 300,
    y: 100,
    title: "Idea",
    content: "・idea-1\n・idea-2\n・idea-3\n・idea-4\n・idea-5",
    color: "#ff9800",
    rotation: 0
  },
  {
    id: 3,
    x: 550,
    y: 200,
    title: "Memo",
    content: "・memo-1\n・memo-2\n・memo-3\n・memo-4\n・memo-5",
    color: "#4caf50",
    rotation: 0
  }
]

const dragStateData: DragState = {
  isDragging: false,
  noteId: null,
  startX: 0,
  startY: 0
}

function App() {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(stickyNotesData)
  const [dragState, setDragState] = useState<DragState>(dragStateData)

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

  return (
    <>
      <div className="board-container">
        <h1>Board markdown</h1>
        <div
          className="sticky-notes-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {stickyNotes.map((note) => (
            <div
              key={note.id}
              className="sticky-note"
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                backgroundColor: note.color,
                transform: `rotate(${note.rotation}deg)`,
                cursor: dragState.isDragging && dragState.noteId === note.id ? 'grabbing' : 'grab'
              }}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
