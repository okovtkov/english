import { useCallback, useEffect, useState } from "react";
import Word from "../word/word";
import Panel from "../panel/panel";
import IconEye from "../svg-icon/icon-eye";
import Switcher from "../switcher/switcher";
import './test.scss';
import IconSound from "../svg-icon/icon-sound";
import { words } from "../../api/words";
import { useParams } from "react-router-dom";

function Test(props) {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState('text');
  const [card, setCard] = useState(props.wordsData[count]);
  const params = useParams();

  const onClick = useCallback(() => {
    const cardData = {...card};
    let part;

    if (cardData.isFavourite) {
      delete cardData.isFavourite;
    } else {
      cardData.isFavourite = true;
    }

    if (params.id === 'general' || params.id === 'favourite') {
      part = props.data.find((item) => {
        const card = item.words.words.find((item) => item.id === cardData.id);
        return card;
      });
    } else {
      part = {...props.data};
    }

    const {owner, name} = part.words;
    const updateArray = part.words.words;
    const index = updateArray.findIndex((item) => item.id === cardData.id);
    updateArray.splice(index, 1, cardData);
    words.update({ owner, name, words: updateArray }, part.id);
    setCard(cardData);
  }, [card, props.data, params.id]);

  useEffect(() => {
    setCard(props.wordsData[count]);
  }, [count, props.data, props.wordsData]);

  return (
    <div className="test">
      <div className="test__wrapper">
        <Switcher
          firstOption={<IconEye />}
          secondOption={<IconSound />}
          onChangeMode={setMode}
          className="test__switcher"
        />
        <Word word={props.wordsData[count]} visibleWord={props.visibleWord} mode={mode} />
        <Panel count={count} onChangeCount={setCount} length={props.wordsData.length} className="test__button" />
        <button className="test__to-favourite" onClick={onClick}>
          {card.isFavourite ? "Убрать из избранного" : "Добавить в избранное"}
        </button>
      </div>
    </div>
  )
}

export default Test;