import { BoardContextProvider } from './context/BoardContext';
import { Header } from './components/Header/Header';
import { Board } from './components/Board/Board';

function App() {
  return (
    <BoardContextProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Board />
      </div>
    </BoardContextProvider>
  );
}

export default App;
