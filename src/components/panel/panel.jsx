import Button from "../button/button";
import { useCallback } from "react";
import './panel.scss';

function Panel(props) {
  const onClick = useCallback((type) => {
    const counter = type === 'next' ? props.count + 1 : props.count - 1;
    if (counter < props.length && counter >= 0) props.onChangeCount(counter);
  }, [props]);

  return(
    <div className="panel">
      <Button onClick={() => setTimeout(() => onClick('prev'), 0)} className="panel__prev">назад</Button>
      <Button onClick={() => setTimeout(() => onClick('next'), 0)} className="panel__next">далее</Button>
    </div>
  )
}

export default Panel;