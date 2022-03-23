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
    const shuffeled = result ? result.words.sort(() => Math.random() - 0.5) : null;

    if (shuffeled) return shuffeled;
    return general;
  }, [params.part]);

  return (
    <div className="test">
      <Word word={wordsData[count]} />
      <Panel count={count} onChangeCount={setCount} length={wordsData.length} />
    </div>
  );
}

export default Test;
