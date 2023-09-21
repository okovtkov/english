import Loading from '../loading/loading';
import SmallCard from '../small-card/small-card';
import Button from '../button/button';
import { audio } from '../../api/audio';

import './words-list.scss';
import { useCallback, useEffect, useState } from 'react';

function WordsList(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playWordsList = useCallback(() => {
    const currentWord = props.data[currentIndex];

    audio.get(currentWord.english, currentWord.russian).then(() => {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    });
  }, [currentIndex, props.data]);

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
      <Button className="words-list__play" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Пауза' : 'Слушать всё'}
      </Button>
      <div className="words-list__container">
        {props.data ? props.data.map((item, i) => (
          <SmallCard
            key={`${item.english}+${i}`}
            word={item.english}
            translate={item.russian}
            className="words-list__card"
          />
        )) : <Loading />}
      </div>
    </dl>
  );
}

export default WordsList;
