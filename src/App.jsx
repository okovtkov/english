import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Index from './pages';
import Test from './pages/test/[part]';

function App() {
  return (
    <Router basename="/english">
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/test/:part' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
