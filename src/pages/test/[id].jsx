/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { words } from "../../api/words";
import Panel from "../../components/panel/panel";
import Switch from "../../components/switch/switch";
import Word from "../../components/word/word";

function Test() {
  const [data, setData] = useState([]);
  const [visibleWord, setVisibleWord] = useState('');
  const [count, setCount] = useState(0);
  const params = useParams();

  const wordsData = useMemo(() => {
    if (data.length === 0) return;
    if (params.id === 'general') {
      const arr = [].concat(...data.map((item) => [...item.words.words]));
      return arr.sort(() => Math.random() - 0.5);
    }

    console.log(data)
    const arr = data.words.words;
    const shuffeled = arr.sort(() => Math.random() - 0.5);
    return shuffeled;
  }, [data]);

  useEffect(() => {
    if (params.id === 'general') {
      words.get().then((resp) => setData(resp));
    } else {
      words.getById(params.id).then(resp => setData(resp));
    }
  }, []);

  return (
    <div className="test">
      {visibleWord && data.length !== 0 ? (
        <>
          <Word word={wordsData[count]} visibleWord={visibleWord} />
          <Panel count={count} onChangeCount={setCount} length={wordsData.length} />
        </>
      ) : (
        <Switch onClick={setVisibleWord} />
      )}
    </div>
  );
}

export default Test;
