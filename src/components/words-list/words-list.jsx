import classNames from 'classnames';
import Loading from '../loading/loading';
import SmallCard from '../small-card/small-card';
import Button from '../button/button';
import SpeakerSettings from '../speaker-settings/speaker-settings';
import { audio } from '../../api/audio';

import './words-list.scss';
import { useCallback, useEffect, useState } from 'react';

function WordsList(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forbiddenWords, setForbiddenWords] = useState([]);
  const [wordsPause, setWordsPause] = useState(1);
  const [translatePause, setTranslateTime] = useState(0);
  const [repeatCount, setRepeatCount] = useState(1);
  const [repeatPause, setRepeatPause] = useState(0);
  const [isUseExamples, setIsUseExamples] = useState(true);

  const getCorrectIndex = useCallback(
    (index) => {
      if (props.data.length === forbiddenWords.size) return -1;
      if (forbiddenWords.includes(index)) {
        return getCorrectIndex(index + 1);
      } else {
        return index;
      }
    },
    [forbiddenWords, props.data.length],
  );

  const sayExamples = useCallback(async (currentWord) => {
    await new Promise((resolve) => {
      setTimeout(async () => {
        await audio.voice(currentWord.example, currentWord.exampleTranslation);
        resolve();
      }, 300);
    });
  }, []);

  const sayWord = useCallback(
    async (currentWord, index, repeatTime) => {
      if (!isPlaying) return;
      const delayBetweenTranslates = translatePause * 1000;
      const delayBetweenWords = wordsPause * 1000;

      await audio.voice(currentWord.english, currentWord.russian, delayBetweenTranslates);
      if (isUseExamples) await sayExamples(currentWord);

      if (repeatTime !== repeatCount) {
        const delayBetweenRepeating = repeatPause * 1000;
        setTimeout(() => {
          sayWord(currentWord, index, repeatTime + 1);
        }, delayBetweenRepeating);
        return;
      }
      setTimeout(() => {
        setCurrentIndex(index + 1);
      }, delayBetweenWords);
    },
    [isPlaying, translatePause, wordsPause, isUseExamples, sayExamples, repeatCount, repeatPause],
  );

  const playWordsList = useCallback(() => {
    const index = getCorrectIndex(currentIndex);
    if (index === -1) {
      setIsPlaying(false);
      return;
    }
    if (index >= props.data.length) {
      setCurrentIndex(0);
      return;
    }
    const currentWord = props.data[index];
    sayWord(currentWord, index, 1);
  }, [currentIndex, getCorrectIndex, props.data, sayWord]);

  const onClickCard = useCallback(
    (_, index) => {
      const clone = [...forbiddenWords];

      if (forbiddenWords.includes(index)) {
        const i = clone.indexOf(index);
        clone.splice(i, 1);
        setForbiddenWords(clone);
      } else {
        clone.push(index);
        setForbiddenWords(clone);
      }
    },
    [forbiddenWords],
  );

  const onChangeSettings = useCallback((data) => {
    setRepeatPause(data.repeatPause);
    setWordsPause(data.wordsPause);
    setTranslateTime(data.translatePause);
    setRepeatCount(data.repeatCount);
    setIsModalOpen(false);
    setIsUseExamples(data.isUseExamples);
  }, []);

  useEffect(() => {
    if (currentIndex > props.data.length - 1) {
      setCurrentIndex(0);
      return;
    }
    if (isPlaying) playWordsList();
    return () => audio.stop();
  }, [currentIndex, isPlaying, playWordsList, props.data.length]);

  return (
    <dl className="words-list">
      <SpeakerSettings
        isOpen={isModalOpen}
        onSubmit={onChangeSettings}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="words-list__buttons">
        <Button className="words-list__play" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Пауза' : 'Слушать всё'}
        </Button>
        <Button className="words-list__params" onClick={() => setIsModalOpen(true)}>
          Параметры
        </Button>
      </div>
      <div className="words-list__container">
        {props.data ? (
          props.data.map((item, i) => (
            <SmallCard
              key={`${item.english}+${i}`}
              wordData={item}
              disabled={isPlaying}
              className={classNames('words-list__card', {
                'words-list__card--current': i === getCorrectIndex(currentIndex) && isPlaying,
                'words-list__card--hidden': forbiddenWords.includes(i),
                'words-list__card--disabled': isPlaying,
              })}
              onClick={(e) => onClickCard(e, i)}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </dl>
  );
}

export default WordsList;
