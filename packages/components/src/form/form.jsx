'use client';
import { useState, useCallback } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import WordEditor from '../word-editor/word-editor';
import './form.scss';

function Form(props) {
  const [wordsList, setWordsList] = useState(props.wordsData);

  const removeHandler = useCallback(
    (i) => {
      const clone = { ...props.wordsData };
      clone.words.words.splice(i, 1);
      setWordsList(clone);
    },
    [props]
  );

  const addHandler = useCallback(() => {
    const word = {
      english: '',
      russian: '',
      id: Date.now() + Math.round(Math.random() * 10000),
    };
    const clone = { ...props.wordsData };
    clone.words.words.push(word);
    setWordsList(clone);
  }, [props]);

  const changeNameHandler = useCallback(
    (e) => {
      const name = e.target.value;
      const clone = { ...props.wordsData };
      clone.words.name = name;
      setWordsList(clone);
    },
    [props]
  );

  const changeHandler = useCallback(
    ({ type, word, index }) => {
      const clone = { ...props.wordsData };
      clone.words.words[index][type] = word;
      setWordsList(clone);
    },
    [props]
  );

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      props.onSubmit(wordsList);
    },
    [props, wordsList]
  );

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__head-wrapper">
        <label className="form__label-name">
          Придумайте название раздела
          <Input
            type="text"
            className="form__input--name"
            onChange={(e) => changeNameHandler(e)}
            value={props.wordsData.words.name}
            required={true}
          />
        </label>
        <Button className="form__button form__button--send" type="submit">
          {props.buttonText}
        </Button>
      </div>
      <div className="form__wrapper">
        {wordsList.words.words.map((item, index) => (
          <li className="form__item" key={index}>
            <WordEditor
              wordData={item}
              onChange={(data) => changeHandler({ ...data, index })}
              onRemove={() => removeHandler(index)}
            />
          </li>
        ))}
        <div className="form__button-wrapper">
          <Button onClick={addHandler} className="form__button">
            +
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
