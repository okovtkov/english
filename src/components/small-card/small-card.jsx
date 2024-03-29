import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './small-card.scss';
import { useCallback } from 'react';
import classNames from 'classnames';

function SmallCard(props) {
  const onClick = useCallback(() => {
    if (props.disabled) return;
    audio.stop();
    audio.get(props.word, props.translate);
  }, [props.disabled, props.translate, props.word]);

  const onClickOnCard = useCallback(
    (e) => {
      if (e.target.closest('.small-card__sound') || props.disabled) return;
      props.onClick();
    },
    [props],
  );

  return (
    <>
      <div className={`small-card ${props.className}`} onClick={onClickOnCard}>
        <dt className="small-card__word">
          <span>{props.word}</span>
          <button
            className={classNames('small-card__sound', {
              'small-card__sound--disabled': props.disabled,
            })}
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
