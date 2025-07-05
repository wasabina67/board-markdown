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
    rotation: -2
  },
  {
    id: 2,
    x: 300,
    y: 150,
    title: "アイデア",
    content: "",
    color: "#ff9800",
    rotation: 1
  },
  {
    id: 3,
    x: 550,
    y: 80,
    title: "メモ",
    content: "",
    color: "#4caf50",
    rotation: -1
  }
];

function App() {
  return (
    <>
      <div className="board-container">
        <h1>Board markdown</h1>
        <div className="sticky-notes-container">
          {stickyNotesData.map((note) => (
            <div>
              <h3>{note.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
