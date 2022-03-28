import { useState, useCallback, useEffect } from 'react';
import { words } from '../../api/words';
import Ref from '../ref/ref';
import './parts.scss';

function Parts() {
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
    <div className="parts">
      <h1>Выбери часть, которую желаешь повторить</h1>
      <div className="parts__general">
        <Ref part="general">General</Ref>
      </div>
      <div className="parts__another">
        {data.map((item) => (
          <Ref key={item.id} id={item.id}>{item.words.id}</Ref>
        ))}
      </div>
    </div>
  );
}

export default Parts;
