import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Projects from './pages/Projects';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route exact path = "/" element={<HomePage />} />
          <Route exact path = "/projects" element={<Projects />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
