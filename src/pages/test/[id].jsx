import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { words } from "../../api/words";
import Test from "../../components/test/test";
import Switch from "../../components/switch/switch";
import WordsList from "../../components/words-list/words-list";

function TestPage(props) {
  const [type, setType] = useState('');
  const [data, setData] = useState([]);
  const [visibleWord, setVisibleWord] = useState('');
  const params = useParams();

  const wordsData = useMemo(() => {
    if (data.length === 0) return null;

    if (params.id === 'favourite') {
      const allWords = [].concat(...data.map((item) => [...item.words.words]));
      const favourite = allWords.filter((item) => item.isFavourite);
      return favourite.length > 0 ? favourite : null;
    }

    if (params.id === 'general') {
      const arr = [].concat(...data.map((item) => [...item.words.words]));
      const sorted = arr.sort(() => Math.random() - 0.5);
      return sorted.length !== 0 ? sorted : null;
    }

    const arr = data.words.words;
    const shuffeled = arr.sort(() => Math.random() - 0.5);
    return shuffeled;
  }, [data, params.id]);

  const selectVariantHandler = useCallback((type) => {
    setType(type);
  }, []);

  const selectLangHandler = useCallback((lang) => {
    setVisibleWord(lang);
    setType('repeating');
  }, []);

  useEffect(() => {
    if (props.data.length && (params.id === 'general' || params.id === 'favourite')) {
      setData(props.data);
      return;
    }

    if (params.id === 'general' || params.id === 'favourite') {
      words.get(props.user.uid).then((resp) => setData(resp));
    } else {
      words.getById(params.id).then((resp) => setData(resp));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wordsData && (params.id === 'favourite' || params.id === 'general')) return (
    <div className="test">
      <p>У Вас пока что нет слов в данном разделе.</p>
    </div>
  )

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
      {type === 'repeating' && <Test data={wordsData} visibleWord={visibleWord} />}
      {type === 'reading' && <WordsList data={wordsData} />}
    </div>
  );
}

export default TestPage;
