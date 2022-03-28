import { Routes, Route } from 'react-router-dom';
import Index from './pages';
import Test from './pages/test/[id]';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/test/:id' element={<Test />} />
    </Routes>
  );
}

export default App;
