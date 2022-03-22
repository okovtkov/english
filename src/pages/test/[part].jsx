import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/button";
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

  const onClick = useCallback((type) => {
    const counter = type === 'next' ? count + 1 : count - 1;
    if (counter < wordsData.words.length) setCount(counter);
  }, [count, wordsData.words.length]);

  return (
    <div className="test">
      <Word word={wordsData.words[count]} />
      <Button onClick={() => onClick('prev')} className="button__prev">prev</Button>
      <Button onClick={() => onClick('next')} className="button__next">next</Button>
    </div>
  );
}

export default Test;
