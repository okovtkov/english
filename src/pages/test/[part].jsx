import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Panel from "../../components/panel/panel";
import Word from "../../components/word/word";
import { data, general } from "../../data/words";

function Test() {
  const [count, setCount] = useState(0);
  const params = useParams();
  const wordsData = useMemo(() => {
    const result = data.find((item) => item.id.toString() === params.part);
    if (result) return result;
    return general;
  }, [params.part]);

  

  return (
    <div className="test">
      <Word word={wordsData.words[count]} />
      <Panel count={count} onChangeCount={setCount} length={wordsData.words.length} />
    </div>
  );
}

export default Test;
