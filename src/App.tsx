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

const dragStateData: DragState = {
  isDragging: false,
  noteId: null,
  startX: 0,
  startY: 0
}

const areas: string[] = [
  "To Do", "Icebox", "In progress", "Done"
]

function App() {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([])
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
