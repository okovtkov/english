import { useCallback, useEffect, useRef } from 'react';
import './word.scss';

function Word(props) {
  const ref = useRef();
  const word = props.visibleWord === 'rus' ? {
    visible: props.word.russian,
    invisible: props.word.english,
  } : {
    visible: props.word.english,
    invisible: props.word.russian,
  }

  const onClick = useCallback(() => {
    ref.current.classList.remove('word__invisible--active');
  }, []);

  useEffect(() => {
    ref.current.classList.add('word__invisible--active');
  }, [props.word]);

  return (
    <div className="word">
      <div className="word__visible">{word.visible}</div>
      <div
        className="word__invisible word__invisible--active"
        ref={ref}
        onClick={onClick}
      >
        {word.invisible}
      </div>
    </div>
  );
}

export default Word;