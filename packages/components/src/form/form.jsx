import { useCallback } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import WordEditor from '../word-editor/word-editor';
import './form.scss';

function Form(props) {
  const removeHandler = useCallback(
    (i) => {
      const clone = { ...props.wordsData };
      clone.words.words.splice(i, 1);
      props.onChangeWordsData(clone);
    },
    [props],
  );

  const addHandler = useCallback(() => {
    const word = {
      english: '',
      russian: '',
      id: Date.now() + Math.round(Math.random() * 10000),
    };
    const clone = { ...props.wordsData };
    clone.words.words.push(word);
    props.onChangeWordsData(clone);
  }, [props]);

  const changeNameHandler = useCallback(
    (e) => {
      const name = e.target.value;
      const clone = { ...props.wordsData };
      clone.words.name = name;
      props.onChangeWordsData(clone);
    },
    [props],
  );

  const changeHandler = useCallback(
    ({ type, word, index }) => {
      const clone = { ...props.wordsData };
      clone.words.words[index][type] = word;
      props.onChangeWordsData(clone);
    },
    [props],
  );

  return (
    <form className="form" onSubmit={props.onSubmit}>
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
        {props.wordsData.words.words.map((item, index) => (
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
