import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './pages';
import Test from './pages/test/[part]';

function App() {
  return (
    <Routes basename="/english">
      <Route path='/' element={<Index />} />
      <Route path='/test/:part' element={<Test />} />
    </Routes>
  );
}

export default App;
