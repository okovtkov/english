import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './small-card.scss';
import { useCallback, useMemo, useState } from 'react';
import Button from '../button/button';
import IconRefresh from '../svg-icon/icon-refresh';
import classNames from 'classnames';

function SmallCard({ wordData, disabled, className, onClick }) {
  const [mode, setMode] = useState('word');
  const [isModeChanging, setIsModeChanging] = useState(false);

  const englishOption = useMemo(() => {
    return mode === 'word' ? wordData.english : wordData.example;
  }, [mode, wordData.english, wordData.example]);

  const translationOption = useMemo(() => {
    return mode === 'word' ? wordData.russian : wordData.exampleTranslation;
  }, [mode, wordData.exampleTranslation, wordData.russian]);

  const voiceTheWord = useCallback(() => {
    audio.stop();
    audio.voice(englishOption, translationOption);
  }, [englishOption, translationOption]);

  const changeMode = useCallback(() => {
    setIsModeChanging(true);
    setTimeout(() => setMode(mode === 'word' ? 'examples' : 'word'), 150);
    setTimeout(() => setIsModeChanging(false), 300);
  }, [mode]);

  return (
    <div
      className={classNames(['small-card', className], {
        'small-card--changing': isModeChanging,
        'small-card--favourite': wordData.isFavourite,
      })}
    >
      <button className="small-card__hide" onClick={onClick} />
      <dl className="small-card__dl">
        <dt className="small-card__word">
          <span className="small-card__text">{englishOption}</span>
          {!disabled && (
            <Button className="small-card__icon" mode="small" onClick={voiceTheWord}>
              <IconSound />
            </Button>
          )}
        </dt>
        <dd className="small-card__translate">
          <span className="small-card__text">{translationOption}</span>
          {!disabled && wordData.example && (
            <Button className="small-card__icon" mode="small" onClick={changeMode}>
              <IconRefresh />
            </Button>
          )}
        </dd>
      </dl>
    </div>
  );
}

export default SmallCard;
