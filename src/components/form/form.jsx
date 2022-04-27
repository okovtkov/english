import { useCallback } from "react";
import Button from "../button/button";
import CloseButton from "../close-button/close-button";
import Input from "../input/input";
import './form.scss';

function Form(props) {
  const closeHandler = useCallback((i) => {
    const clone = {...props.wordsData};
    clone.words.words.splice(i, 1);
    props.onChangeWordsData(clone);
  }, [props]);

  const addHandler = useCallback(() => {
    const word = {
      english: '',
      russian: '',
      id: Date.now() + Math.round(Math.random() * 10000),
    };
    const clone = {...props.wordsData};
    clone.words.words.push(word);
    props.onChangeWordsData(clone);
  }, [props]);

  const changeNameHandler = useCallback((e) => {
    const name = e.target.value;
    const clone = {...props.wordsData};
    clone.words.name = name;
    props.onChangeWordsData(clone);
  }, [props]);

  const changeEnglishHandler = useCallback((e, i) => {
    const english = e.target.value;
    const clone = {...props.wordsData};
    clone.words.words[i].english = english;
    props.onChangeWordsData(clone);
  }, [props]);

  const changeTranslateHandler = useCallback((e, i) => {
    const russian = e.target.value;
    const clone = {...props.wordsData};
    clone.words.words[i].russian = russian;
    props.onChangeWordsData(clone);
  }, [props]);

  return(
    <form className="form" onSubmit={props.onSubmit}>
      <div className="form__head-wrapper">
        <label className="form__label form__label--name">
          Придумайте название раздела
          <Input
            type="text"
            className="form__input--name"
            onChange={(e) => changeNameHandler(e)}
            value={props.wordsData.words.name}
            required={true}
          />
        </label>
        <Button
          className="form__button form__button--send"
          type="submit"
        >{props.buttonText}</Button>
      </div>
      <div className="form__wrapper">
        {props.wordsData.words.words.map((item, i) => (
          <div key={i} className="form__words-wrapper">
            <CloseButton className="form__close" onClick={() => closeHandler(i)}/>
            <label className="form__label">
              Введите слово на английском
              <Input
                type="text"
                onChange={(e) => changeEnglishHandler(e, i)}
                value={item.english}
                required={true}
              />
            </label>
            <label className="form__label">
              Введите перевод
              <Input
                type="text"
                onChange={(e) => changeTranslateHandler(e, i)}
                value={item.russian}
                required={true}
              />
            </label>
          </div>
        ))}
        <div className="form__button-wrapper">
          <Button onClick={addHandler} className="form__button">+</Button>
        </div>
      </div>
    </form>
  )
}

export default Form;
