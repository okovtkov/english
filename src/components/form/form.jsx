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
    <form className="create-form">
      <div className="create-form__head-wrapper">
        <label className="create-form__label create-form__label--name">
          Придумайте название раздела
          <Input
            type="text"
            className="create-form__input--name"
            onChange={(e) => changeNameHandler(e)}
            value={props.wordsData.words.name}
            required={true}
          />
        </label>
        <Button
          className="create-form__button create-form__button--send"
          type="submit"
          onClick={(e) => props.onSubmit(e)}
        >{props.buttonText}</Button>
      </div>
      <div className="create-form__wrapper">
        {props.wordsData.words.words.map((item, i) => (
          <div key={i} className="create-form__words-wrapper">
            <CloseButton className="create-form__close" onClick={() => closeHandler(i)}/>
            <label className="create-form__label">
              Введите слово на английском
              <Input
                type="text"
                onChange={(e) => changeEnglishHandler(e, i)}
                value={item.english}
                required={true}
              />
            </label>
            <label className="create-form__label">
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
        <div className="create-form__button-wrapper">
          <Button onClick={addHandler} className="create-form__button">+</Button>
        </div>
      </div>
    </form>
  )
}

export default Form;
