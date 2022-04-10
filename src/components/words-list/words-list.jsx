import { useCallback } from 'react';
import IconSound from '../svg-icon/icon-sound';
import './words-list.scss';

function WordsList(props) {
  const onClick = useCallback((word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  }, []);

  return (
    <dl className="words-list">
      {props.data.map((item) => (
        <div key={item.english} className="words-list__wrapper">
          <dt className="words-list__word">
            {item.english}
            <button className="words-list__sound" onClick={() => onClick(item.english)}>
              <IconSound />
            </button>
          </dt>
          <dd className="words-list__translate">{item.russian}</dd>
        </div>
      ))}
    </dl>
  );
}

export default WordsList;
