import { useState } from "react";
import Word from "../word/word";
import Panel from "../panel/panel";
import IconEye from "../svg-icon/icon-eye";
import Switcher from "../switcher/switcher";
import './test.scss';
import IconSound from "../svg-icon/icon-sound";

function Test(props) {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState('text');

  return (
    <div className="test">
      <div className="test__wrapper">
        <Switcher
          firstOption={<IconEye />}
          secondOption={<IconSound />}
          onChangeMode={setMode}
          className="test__switcher"
        />
        <Word word={props.data[count]} visibleWord={props.visibleWord} mode={mode} />
        <Panel count={count} onChangeCount={setCount} length={props.data.length} className="test__button" />
      </div>
    </div>
  )
}

export default Test;