import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './small-card.scss';
import { useCallback } from 'react';

function SmallCard(props) {
  const onClick = useCallback(() => {
    audio.stop();
    audio.get(props.word, props.translate);
  }, [props.translate, props.word]);

  return (
    <>
      <div className={`small-card ${props.className}`}>
        <dt className="small-card__word">
          {props.word}
          <button
            className="small-card__sound"
            onClick={onClick}
          >
            <IconSound />
          </button>
        </dt>
        <dd className="small-card__translate">{props.translate}</dd>
      </div>
    </>
  );
}

export default SmallCard;
