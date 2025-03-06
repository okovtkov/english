import './test.scss';
import { useCallback, useEffect, useState } from 'react';
import Word from '../word/word';
import Panel from '../panel/panel';
import IconEye from '../svg-icon/icon-eye';
import Switcher from '../switcher/switcher';
import IconSound from '../svg-icon/icon-sound';
import Loading from '../loading/loading';
import { api } from '@english/api';
import { useMutation } from '@tanstack/react-query';

function Test(props) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('text');
  const [card, setCard] = useState(props.defaultWordsList ? props.defaultWordsList[index] : null);
  const [visible, setVisible] = useState(false);
  const [wordsList, setWordsList] = useState(props.defaultWordsList);

  const { mutate: updatePart } = useMutation({
    mutationFn: (data) => {
      api.words.update(data.information, data.id);
    },
  });

  const onClick = useCallback(() => {
    const cardData = { ...card };
    let part;

    if (cardData.isFavourite) {
      delete cardData.isFavourite;
    } else {
      cardData.isFavourite = true;
    }

    if (props.id === 'general' || props.id === 'favourite') {
      part = props.wordsData.find((item) => {
        const card = item.words.words.find((item) => item.id === cardData.id);
        return card;
      });
    } else {
      part = { ...props.wordsData };
    }

    const { owner, name, createdAt } = part.words;
    const updatedArray = part.words.words;
    const index = updatedArray.findIndex((item) => item.id === cardData.id);
    updatedArray.splice(index, 1, cardData);
    updatePart({ information: { owner, name, words: updatedArray, createdAt }, id: part.id });
    setCard(cardData);

    if (props.id === 'general' || props.id === 'favourite') {
      const index = wordsList.findIndex((item) => item.id === cardData.id);
      wordsList.splice(index, 1, cardData); // TODO: сделать грамотно
    } else {
      setWordsList(updatedArray);
    }
  }, [card, props.id, props.wordsData, updatePart, wordsList]);

  const onChangeMode = useCallback((isChecked) => {
    setMode(isChecked ? 'sound' : 'text');
    setVisible(false);
  }, []);

  const changeVisibleHandler = useCallback(
    (word) => {
      setVisible(true);
      if (mode === 'text') return;
      const lang = props.visibleWord === 'rus' ? 'eng' : 'rus';
      api.audio.say(word, lang);
    },
    [mode, props.visibleWord]
  );

  useEffect(() => {
    if (!wordsList.length) return;
    setCard(wordsList[index]);
  }, [index, wordsList]);

  if (!card) return <Loading />;

  return (
    <div className="test">
      <div className="test__wrapper">
        <header className="test__header">
          <Switcher
            theme="primary"
            firstOption={<IconEye />}
            secondOption={<IconSound />}
            onChange={onChangeMode}
            className="test__switcher"
          />
        </header>
        <Word
          visible={visible}
          onChangeVisible={changeVisibleHandler}
          word={card}
          visibleWord={props.visibleWord}
          mode={mode}
          className="test__words"
        />
        <Panel
          onChangeVisible={setVisible}
          index={index}
          onChangeIndex={setIndex}
          length={wordsList.length}
          className="test__panel"
        />
        <footer className="test__footer">
          <button className="test__to-favourite" onClick={onClick}>
            {card.isFavourite ? 'Убрать из избранного' : 'Добавить в избранное'}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Test;
