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
import { audio } from './api/audio';

function App() {
  const [checked, setChecked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
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
      ],
    },
  });

  const getWords = useCallback(() => {
    if (!authorized) return;
    words.get(user.uid).then((resp) => {
      const sorted = resp.sort((a, b) => a.words.createdAt - b.words.createdAt);
      setData(sorted);
      setChecked(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  useEffect(() => getWords(), [authorized, getWords]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && !authorized) {
      authorisation
        .signIn(user.email, user.password)
        .then((resp) => {
          setUser(resp);
          setAuthorized(true);
          setLoaded(true);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
    audio.initiate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) return <Loading />;

  if (!authorized)
    return <Auth user={user} onChangeUser={setUser} onChangeAuthorized={setAuthorized} />;

  return (
    <>
      <Header
        onChangeAuthorized={setAuthorized}
        onChangeUser={setUser}
        onChangeChecked={setChecked}
        data={data}
      />
      <Routes>
        <Route path="/" element={<Index getWords={getWords} checked={checked} data={data} />} />
        <Route path="/test/:id" element={<Test data={data} user={user} />} />
        <Route path="/edit" element={<Edit data={data} onChangeData={setData} />} />
        <Route
          path="/edit/:id"
          element={
            <EditPart
              user={user}
              data={data}
              onChangeData={setData}
              wordsData={wordsData}
              onChangeWordsData={setWordsData}
            />
          }
        />
        <Route
          path="/edit/create"
          element={
            <Create
              user={user}
              data={data}
              onChangeData={setData}
              wordsData={wordsData}
              onChangeWordsData={setWordsData}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
