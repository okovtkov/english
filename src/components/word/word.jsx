import { useCallback, useEffect, useRef } from 'react';
import './word.scss';

function Word(props) {
  const ref = useRef();

  const onClick = useCallback(() => {
    ref.current.classList.remove('word__russian--invisible');
  }, []);

  useEffect(() => {
    ref.current.classList.add('word__russian--invisible');
  }, [props.word]);

  return (
    <div className="word">
      <div className="word__english">{props.word.english}</div>
      <div
        className="word__russian word__russian--invisible"
        ref={ref}
        onClick={onClick}
      >
        {props.word.russian}
      </div>
    </div>
  );
}

export default Word;