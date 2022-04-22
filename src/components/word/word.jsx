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
      <p className="word__visible">{word.visible}</p>
      <p
        className="word__invisible word__invisible--active"
        ref={ref}
        onClick={onClick}
      >
        {word.invisible}
      </p>
    </div>
  );
}

export default Word;