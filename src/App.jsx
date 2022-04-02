/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from 'react';
import { words } from '../src/api/words';
import { Routes, Route } from 'react-router-dom';
import Index from './pages';
import Test from './pages/test/[id]';
import './App.css';
import Header from './components/header/header';
import Edit from './pages/edit/edit';
import Create from './pages/edit/create';
import EditPart from './pages/edit/[id]';

function App() {
  const [data, setData] = useState([]);
  const [wordsData, setWordsData] = useState({
    id: '',
    words: {
      name: '',
      words: [
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
      ]
    }
  });

  const compare = useCallback((a, b) => {
    const first = Number(a.words.name);
    const second = Number(b.words.name);
    if (typeof first === 'number' && typeof second === 'number') {
      return first - second;
    }
    if (a.words.name > b.words.name) return 1;
    if (a.words.name < b.words.name) return -1;
    return 0;
  }, []);

  useEffect(() => {
    words.get().then(resp => {
      const sorted = resp.sort(compare);
      setData(sorted);
    });
    console.log('kekek')
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Index data={data} />} />
        <Route path='/test/:id' element={<Test />} />
        <Route path='/edit' element={<Edit data={data} onChangeData={setData} />} />
        <Route path='/edit/:id' element={
          <EditPart
            data={data}
            onChangeData={setData}
            wordsData={wordsData}
            onChangeWordsData={setWordsData}
          />
        } />
        <Route path='/edit/create' element={
          <Create
            data={data}
            onChangeData={setData}
            wordsData={wordsData}
            onChangeWordsData={setWordsData}
          />
        } />
      </Routes>
    </>
  );
}

export default App;
