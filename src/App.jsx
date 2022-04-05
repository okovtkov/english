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
import Auth from './components/auth/auth';
import { authorisation } from './api/auth';
import Loading from './components/loading/loading';

function App() {
  const [checked, setChecked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [authorised, setAuthorised] = useState(false);
  const [data, setData] = useState([]);
  const [wordsData, setWordsData] = useState({
    id: '',
    words: {
      owner: '',
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
    if (!authorised) return;
    words.get(user.uid).then(resp => {
      const sorted = resp.sort(compare);
      setData(sorted);
      setChecked(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorised]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && !authorised) {
      authorisation.signIn(user.email, user.password)
        .then((resp) => {
          setUser(resp);
          setAuthorised(true);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        })
    } else {
      setLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) return (
    <div className="App__loading">
      <Loading />
    </div>
  )

  if (!authorised) return (
    <Auth user={user} onChangeUser={setUser} onChangeAuthorised={setAuthorised} />
  )

  return (
    <>
      <Header onChangeAuthorised={setAuthorised} onChangeUser={setUser} onChangeChecked={setChecked} />
      <Routes>
        <Route path='/' element={<Index checked={checked} data={data} />} />
        <Route path='/test/:id' element={<Test user={user} />} />
        <Route path='/edit' element={<Edit data={data} onChangeData={setData} />} />
        <Route path='/edit/:id' element={
          <EditPart
            user={user}
            data={data}
            onChangeData={setData}
            wordsData={wordsData}
            onChangeWordsData={setWordsData}
          />
        } />
        <Route path='/edit/create' element={
          <Create
            user={user}
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
