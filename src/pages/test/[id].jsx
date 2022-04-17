/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { words } from "../../api/words";
import Panel from "../../components/panel/panel";
import Switch from "../../components/switch/switch";
import Word from "../../components/word/word";
import WordsList from "../../components/words-list/words-list";

function Test(props) {
  const [type, setType] = useState('');
  const [data, setData] = useState({});
  const [visibleWord, setVisibleWord] = useState('');
  const [count, setCount] = useState(0);
  const params = useParams();

  const wordsData = useMemo(() => {
    if (!data.id) return;
    if (params.id === 'general') {
      const arr = [].concat(...data.map((item) => [...item.words.words]));
      return arr.sort(() => Math.random() - 0.5);
    }

    const arr = data.words.words;
    const shuffeled = arr.sort(() => Math.random() - 0.5);
    return shuffeled;
  }, [data]);

  const selectVariantHandler = useCallback((type) => {
    if (!data.id) return;
    setType(type);
  }, [data]);

  const selectLangHandler = useCallback((lang) => {
    setVisibleWord(lang);
    setType('repeating');
  }, []);

  useEffect(() => {
    if (params.id === 'general') {
      words.get(props.user.uid).then((resp) => setData(resp));
    } else {
      words.getById(params.id).then((resp) => setData(resp));
    }
  }, []);

  return (
    <div className="test">
      {!type &&
        <Switch
          firstValue="просмотреть"
          secondValue="повторить"
          onSelectFirstValue={() => selectVariantHandler('reading')}
          onSelectSecondValue={() => selectVariantHandler('translate-selecting')}
        >
          Выберите что вы хотите сделать с разделом
        </Switch>
      }
      {type === 'translate-selecting' &&
        <Switch
          firstValue="с русского"
          secondValue="с английского"
          onSelectFirstValue={() => selectLangHandler('rus')}
          onSelectSecondValue={() => selectLangHandler('eng')}
        >Выберите с какого языка хотите переводить</Switch>
      }
      {type === 'repeating' && (
        <>
          <Word word={wordsData[count]} visibleWord={visibleWord} />
          <Panel count={count} onChangeCount={setCount} length={wordsData.length} />
        </>
      )}
      {type === 'reading' && <WordsList data={wordsData} />}
    </div>
  );
}

export default Test;
