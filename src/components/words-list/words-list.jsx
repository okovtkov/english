import classNames from 'classnames';
import Loading from '../loading/loading';
import SmallCard from '../small-card/small-card';
import Button from '../button/button';
import ModalWindow from '../modal-window/modal-window';
import { audio } from '../../api/audio';

import './words-list.scss';
import { useCallback, useEffect, useState } from 'react';

function WordsList(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forbiddenWords, setForbiddenWords] = useState([]);

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

    audio.get(currentWord.english, currentWord.russian).then(() => {
      setTimeout(() => {
        setCurrentIndex(index + 1);
      }, 1000);
    });
  }, [currentIndex, getCorrectIndex, props.data]);

  const onClickCard = useCallback(
    (_, index) => {
      // если нажали на значек озвучивания слова, то ничего не делать
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
      <ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
              word={item.english}
              disabled={isPlaying}
              translate={item.russian}
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
