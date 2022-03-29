import { useState, useCallback, useEffect } from 'react';
import { words } from '../src/api/words';
import { Routes, Route } from 'react-router-dom';
import Index from './pages';
import Test from './pages/test/[id]';
import './App.css';
import Header from './components/header/header';
import Edit from './components/edit/edit';

function App() {
  const [data, setData] = useState([]);

  const compare = useCallback((a, b) => {
    if (a.words.id > b.words.id) return 1;
    if (a.words.id < b.words.id) return -1;
    return 0;
  }, []);

  useEffect(() => {
    words.get().then(resp => {
      const sorted = resp.sort(compare);
      setData(sorted);
    });
  }, [compare]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Index data={data} />} />
        <Route path='/test/:id' element={<Test />} />
        <Route path='/edit' element={<Edit data={data} />} />
      </Routes>
    </>
  );
}

export default App;
