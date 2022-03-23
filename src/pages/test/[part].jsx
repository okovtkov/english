import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Panel from "../../components/panel/panel";
import Switch from "../../components/switch/switch";
import Word from "../../components/word/word";
import { data, general } from "../../data/words";

function Test() {
  const [visibleWord, setVisibleWord] = useState('');
  const [count, setCount] = useState(0);
  const params = useParams();
  const wordsData = useMemo(() => {
    const result = data.find((item) => item.id.toString() === params.part);
    const shuffeled = result ? 
      result.words.sort(() => Math.random() - 0.5) :
      general.words.sort(() => Math.random() - 0.5);

    return shuffeled;
  }, [params.part]);

  return (
    <div className="test">
      {visibleWord ? (
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
