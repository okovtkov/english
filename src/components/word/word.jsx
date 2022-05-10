import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { audio } from '../../api/audio';
import IconSound from '../svg-icon/icon-sound';
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

  const soundHandler = useCallback(() => {
    audio.say(word.visible, props.visibleWord);
  }, [props.visibleWord, word.visible]);

  useEffect(() => {
    if (props.mode === 'sound') {
      audio.say(word.visible, props.visibleWord);
    };
    ref.current.classList.add('word__invisible--active');

    return audio.stop;
  }, [props.mode, props.visibleWord, props.word, word.visible]);

  return (
    <div className="word">
      {props.mode === 'text' ? (
        <p className="word__visible">{word.visible}</p>
      ) : (
        <button className="word__sound" onClick={soundHandler}>
          <IconSound />
        </button>
      )}
      <p
        className={classNames("word__invisible", {
          "word__invisible--active": !props.visible,
        })}
        ref={ref}
        onClick={() => props.onChangeVisible(true)}
      >
        {word.invisible}
      </p>
    </div>
  );
}

export default Word;