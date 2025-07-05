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

function App() {
  return (
    <>
      <div className="board-container">
        <h1>Board markdown</h1>
        <div className="sticky-notes-container">
          {stickyNotesData.map((note) => (
            <div
              key={note.id}
              className="sticky-note"
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                backgroundColor: note.color,
                transform: `rotate(${note.rotation}deg)`
              }}
            >
              <h3>{note.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
