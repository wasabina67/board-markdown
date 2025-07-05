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

const stickyNotesData: StickyNote[] = [];

function App() {
  return (
    <>
      <h1>Board markdown</h1>
    </>
  )
}

export default App
