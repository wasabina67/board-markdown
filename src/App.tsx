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
    y: 100,
    title: "タスク",
    content: "",
    color: "#ffeb3b",
    rotation: 0
  },
  {
    id: 2,
    x: 300,
    y: 100,
    title: "アイデア",
    content: "",
    color: "#ff9800",
    rotation: 0
  },
  {
    id: 3,
    x: 550,
    y: 100,
    title: "メモ",
    content: "",
    color: "#4caf50",
    rotation: 0
  }
];

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
