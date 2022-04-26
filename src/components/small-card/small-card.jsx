import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './small-card.scss';

function SmallCard(props) {
  return (
    <>
      <div className={`small-card ${props.className}`}>
        <dt className="small-card__word">
          {props.word}
          <button
            className="small-card__sound"
            onClick={() => audio.get(props.word, props.translate)}
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
