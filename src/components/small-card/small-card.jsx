import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './small-card.scss';
import { useCallback } from 'react';
import classNames from 'classnames';

function SmallCard({ word, translate, disabled, className, onClick }) {
  const voiceTheWord = useCallback(() => {
    if (disabled) return;
    audio.stop();
    audio.voice(word, translate);
  }, [disabled, translate, word]);

  return (
    <div className={`small-card ${className}`}>
      <button className="small-card__hide" onClick={onClick} />
      <dl className="small-card__dl">
        <dt className="small-card__word">
          <span>{word}</span>
          <button
            className={classNames('small-card__sound', {
              'small-card__sound--disabled': disabled,
            })}
            onClick={voiceTheWord}
          >
            <IconSound />
          </button>
        </dt>
        <dd className="small-card__translate">{translate}</dd>
      </dl>
    </div>
  );
}

export default SmallCard;
