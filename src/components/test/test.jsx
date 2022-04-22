import { useState } from "react";
import Word from "../word/word";
import Panel from "../panel/panel";
import './test.scss';

function Test(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="test">
      <hr className="test__line" />
      <div className="test__wrapper">
        <Word word={props.data[count]} visibleWord={props.visibleWord} />
        <Panel count={count} onChangeCount={setCount} length={props.data.length} className="test__button" />
      </div>
      <hr className="test__line" />
    </div>
  )
}

export default Test;