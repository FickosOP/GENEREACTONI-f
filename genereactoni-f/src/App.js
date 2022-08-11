import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Projects from './pages/Projects';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route exact path = "/" element={<HomePage />} />
          <Route exact path = "/projects" element={<Projects />} />
          <Route exact path = "/login" element={<LoginPage />} />
          <Route exact path = "/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
