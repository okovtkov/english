import Button from "../button/button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './panel.scss';

function Panel(props) {
  const navigate = useNavigate();
  const onClick = useCallback((type) => {
    const counter = type === 'next' ? props.count + 1 : props.count - 1;
    console.log(counter)
    if (counter < props.length) props.onChangeCount(counter);
  }, [props]);

  return(
    <div className="panel">
      <Button onClick={() => onClick('prev')} className="panel__prev">prev</Button>
      <Button onClick={() => navigate('/')} className="panel__home">Home</Button>
      <Button onClick={() => onClick('next')} className="panel__next">next</Button>
    </div>
  )
}

export default Panel;